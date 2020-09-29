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
import helper from '../../services/helper';
import shareData from '../../services/shareData';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ReactLoading from 'react-loading';
import DatePicker from "react-datepicker";
import testdata from './test-data.js';
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

const columns1 = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
    cellExport: d => (
      {
        Title: d.title,
        Runtime: d.runtime,
        Actors: d.actors,
      }
    ),
  },
  {
    name: 'Director',
    selector: 'director',
    sortable: true,
  },
  {
    name: 'Genres',
    selector: 'genres',
    sortable: true,
    cell: d => <span>{d.genres.join(', ')}</span>,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
  },
];

const customStyles = {
  title: {
    style: {
      fontColor: 'red',
      fontWeight: '10',
    }
  },
  rows: {
    style: {
      minHeight: '72px', // override the row height
    }
  },
  headCells: {
    style: {
      fontSize: '20px',
      fontWeight: '500',
      textTransform: 'uppercase',
      paddingLeft: '0 8px'
    },
  },
  cells: {
    style: {
      fontSize: '17px',
      paddingLeft: '0 8px',
    },
  },
};
const objUser = local.get('user');

export default class MemberList extends Component {
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
      txnCode: "",
      phone: "",
      createdAt: moment().format("YYYY-MM-DD"),
      startDate: "",
      endDate: "",
      name: "",
      listMember:[]
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

        },
        {
          name: 'PhoneNumber',
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
          name: 'Action',
          cell: row => <Button className="btn btn-sm" tag="a" href={'#/member-detail/' + row.id}><i className="fa fa-eye"></i> Detail</Button>
        }
      ],
    }
    this.keyPressed = this.keyPressed.bind(this);
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      this.searchRequest();
    }
  }

  //handle react-select selected data
  valueFromId = (opts, id) => opts.find(o => o.id === id);

  //options for select dropdown


  async componentDidMount() {
    let result = await api.memberList();
    console.log("Response", result);
    if (!result || (result && result.code != 200))
      return helper.alert(result.message);
    this.setState({
      loading: false,
      listMember: result.data
    });
  }

  render() {
    const { loading, isLoaded, data, totalRows,listMember } = this.state;

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
                    <DataTableExtensions
                      columns={this.table.columns}
                      data={this.state.listMember}
                      filterPlaceHolder="Filter"
                      customStyles={customStyles}
                    >
                      <DataTable
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                        customStyles={customStyles}
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
export const MemberListStory = () => {
  storiesOf('Pagination', module)
    .add('Server-Side', () => <MemberList />)
}
