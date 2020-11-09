import React, { Component } from 'react';
import {
  Button,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormText,
  Table,
  Badge,
  Row,
} from 'reactstrap';
import { storiesOf } from '@storybook/react';
import DataTable from 'react-data-table-component';
import moment from 'moment'
import { DateRangePicker } from 'rsuite';
import Select from 'react-select'
import config from '../../services/config';
import local from '../../services/local';
import api from '../../services/api';
import shareData from '../../services/shareData';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import ReactLoading from 'react-loading';
import DatePicker from "react-datepicker";
import axios from 'axios';
import DataTableExtensions from 'react-data-table-component-extensions';

const columns = [

  { name: 'Customer', cell: row => <div title={row.sender.name}>{row.sender.name}</div> },
  { name: 'Phone', sortable: true, selector: 'sender.phone' },
  { name: 'Email', cell: row => <div title={row.name}>{row.name}</div> },
  { name: 'Phone', sortable: true, selector: 'sender.phone' },
  { name: 'Status', right: true, cell: row => <Button size="sm" color={row.status === 'done' ? "success" : "danger"} className="btn-pill">{row.status}</Button> },
  { name: 'Time', sortable: true, cell: row => row.createdAt ? moment(row.createdAt).format('YYYY-MM-DD HH:mm') : "-" },
  {
    name: 'Action', right: true,
    cell: row => <Button className="btn btn-sm" tag="a" href={'#/member-detail/' + row.id}><i className="fa fa-eye"></i> Detail</Button>
  }
];



const objUser = local.get('user');

export default class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      services: [],
      shops: [],
      shop: "",
      submerchants: [],
      submerchant: '',
      loading: false,
      totalRows: 0,
      perPage: 10,
      page: 1,
      isLoaded: false,
      error: null,
      txnCode: "",
      phone: "",
      serviceId: "",
      createdAt: moment().format("YYYY-MM-DD"),
      startDate: "",
      endDate: "",
      name: ""
    };

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

  //options for select dropdown


  async componentDidMount() {
    const config = {
      method: "POST",
      url: 'https://ayavapp.herokuapp.com/admin/volunteerCredentials',
      headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQ3Mjc2MzAsImV4cCI6MTYwNDgxNDAzMH0.jtQ2rClZ5Dxhoce8H54AGSvbsDN8tGGNXcnTQtMqeYQ" }
    }

    axios(config)
      .then((result) => {
        console.log('response data' + result.data.data.length)
        this.setState({ data: result.data.data })
      })
  }

  render() {
    const { loading, isLoaded, data, totalRows } = this.state;

    if (this.state.data) {
      const table = {
        columns: [
          {
            name: 'User Name',
            selector: 'username',
            sortable: true,
          },
          {
            name: 'Password',
            selector: 'password',
            sortable: true,
          },

        ],
        data: this.state.data

      }

      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12">
              <div className="card">
                <div className="card-body label-span-style">
                  <Row>
                    <Col xs="12" md="3">
                      <label>Name</label>
                      <input type='text' onKeyPress={this.keyPressed} value={this.state.name} onChange={evt => this.setState({ name: evt.target.value })} className="form-control" />
                    </Col>
                    <Col xs="12" md="3">
                      <label>Phone</label>
                      <input type='text' onKeyPress={this.keyPressed} value={this.state.phone} onChange={evt => this.setState({ phone: evt.target.value })} className="form-control" />
                    </Col>
                    <Col xs="12" md="3">

                      <Row>
                        <Col xs="12" md="6">
                          <label>Start Date</label>
                          <DatePicker
                            className="form-control"
                            format="YYYY-MM-DD"
                            placeholder="Select Date Range"
                            selected={this.state.startDate}
                            onChange={date => this.setState({ startDate: date })} />
                        </Col>
                        <Col xs="12" md="6">
                          <label>End Date</label>
                          <DatePicker
                            className="form-control"
                            selected={this.state.endDate}
                            onChange={date => this.setState({ endDate: date })} />
                        </Col>
                      </Row>

                    </Col>
                    <Col xs="12" md="3">
                      <label>{''}</label><br />
                      <Button color="secondary" size="md" onClick={this.searchRequest}><i className="fa fa-search"></i> Search</Button>

                    </Col>
                  </Row><br />
                  <Row>

                    <Col xs="12" md="3">

                    </Col>
                    <Col xs="12" md="3">

                    </Col>
                  </Row><br />

                  <Row>
                  </Row>
                </div>
              </div>
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
                  <div className="card-title">Member History</div>
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
                        columns={table.columns}
                        data={table.data}
                        filterPlaceHolder="Dayımlar"
                        export = {true}
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
        </div>
      );
    }
  }
}
export const MemberListStory = () => {
  storiesOf('Pagination', module)
    .add('Server-Side', () => <MemberList />)
}
