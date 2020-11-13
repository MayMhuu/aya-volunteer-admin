import React, { Component } from 'react';
import {
  Button,
  Col,
  Row,
  FormText
} from 'reactstrap';
import { Modal, Form, Alert } from 'react-bootstrap'
import { storiesOf } from '@storybook/react';
import DataTable from 'react-data-table-component';
import moment from 'moment'
import local from '../../services/local';
import 'react-notifications-component/dist/theme.css';
import ReactLoading from 'react-loading';
import DataTableExtensions from 'react-data-table-component-extensions';
import './custom.css';
import axios from 'axios';
import { Form as FormIO } from 'react-formio'

const objUser = local.get('user');

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      totalRows: 0,
      perPage: 10,
      page: 1,
      isLoaded: false,
      error: null,
      name: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      serviceId: "",
      createdAt: moment().format("YYYY-MM-DD"),
      modal: false,
      alert: false
    };
    this.table = {
      columns: [
        {
          name: 'Name',
          selector: 'name',
          sortable: true,
          cellExport: d => (
            {
              Name: d.name
            }
          ),
        }, {
          name: 'User Name',
          selector: 'address',
          sortable: true,
        },
        {
          name: 'Phone',
          selector: 'phone',
          sortable: true,
        },
        {
          name: 'Email',
          selector: 'email',
          sortable: true,
        },

        {
          name: 'Status',
          selector: 'status',
          sortable: true,
        },
        {
          name: 'Action', right: true,
          cell: row => <Button className="btn btn-sm" tag="a" href={'#/user-detail/' + row.id}><i className="fa fa-eye"></i> Detail</Button>
        }
      ],
      //  data: testdata

    }
    this.keyPressed = this.keyPressed.bind(this);
  }

  stautses = [{ name: "done" }, { name: "refunded" }, { name: "pending" }, { name: "cancelled" }, { name: "failed" }, { name: "reversed" }, { name: "expired" }, { name: "refused" }, { name: "redeemed" }];

  keyPressed(event) {
    if (event.key === "Enter") {
      this.searchRequest();
    }
  }

  //handle react-select selected data
  valueFromId = (opts, id) => opts.find(o => o.id === id);

  //Change input field data
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log('typing' + e.target.name)

  }

  //Submit Form Data

  submitAdminData = (e) => {
    // get our form data out of state
    const { name, username, phone, email, password } = this.state;

    axios.post('https://ayavapp.herokuapp.com/admin/create', { name, username, phone, email, password })
      .then((result) => {
        if (result.status == 200) {
          this.setState({ modal: false })
          this.setState({ alert: true })
        } else {
          alert('Error')
        }
      });
  }

  async componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    const auth = `Bearer ${accessToken}`;

    const config = {
      headers: { "Authorization": auth }
    }

    axios.get('https://ayavapp.herokuapp.com/admin/getAdminList', config)
      .then((result) => {
        this.setState({ data: result.data.data })
      })
  }

  render() {
    const { loading, isLoaded, data, totalRow, alert } = this.state;

    return (
      <div className="animated fadeIn">
        { alert && <Alert variant="success">
          Admin created.</Alert>}
        <Row>
          <Col xs="12">
            <Row>
              <Col md="2">
              </Col>
              <Col md="2">
              </Col>
              <Col md="2">
              </Col>
              <Col md="2">
              </Col>
              <Col md="2">
              </Col>
              <Col xs="12" md="2" className="create-btn">
                <Button color="secondary" size="md"
                  onClick={e => this.setState({ modal: true })}
                ><i className="fa fa-plus"></i> Create User</Button>
              </Col>
            </Row>
          </Col>
        </Row>

        { isLoaded &&
          <div className="text-center">
            <ReactLoading className="reactLoading" width={35} height={35} type={"bars"} color={"#d3460d"} />
            <FormText className="card-title">Please Wait...</FormText>
          </div>
        }
        <Row>

          <Col xs="12">
            <div className="card">
              <div className="card-header">
                <div className="card-title">User List</div>
                <div className="card-header-actions">

                </div>
              </div>
              <div className="card-body label-span-style">
                <Row>
                  <Col>
                    {/* <DataTable
                      title="Member List"
                      columns={columns}
                      data={data}
                      progressPending={loading}
                      pagination
                      paginationServer
                      paginationTotalRows={totalRows}
                      onChangeRowsPerPage={this.handlePerRowsChange}
                      onChangePage={this.handlePageChange}
                    /> */}
                    <DataTableExtensions
                      columns={this.table.columns}
                      data={this.state.data}
                      exportHeaders = {false}
                      export = {true}
                      filterPlaceHolder="Dayımlar"
                    >
                      <DataTable
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                      />
                    </DataTableExtensions>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        <div>
          <Modal
            show={this.state.modal}
            onHide={e => this.setState({ modal: false })}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Admin Registration Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormIO
                src="https://soaigljodahrapg.form.io/register"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary"
                onClick={e => {
                  this.submitAdminData(e)
                }
                }
              >
                Submit
          </Button>
              <Button variant="primary" onClick={e => this.setState({ modal: false })}>Close</Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>
    );
  }
}


export const UserListStory = () => {
  storiesOf('Pagination', module)
    .add('Server-Side', () => <UserList />)
}
