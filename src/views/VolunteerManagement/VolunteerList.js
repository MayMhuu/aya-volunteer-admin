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
import { Form as FormIO } from 'react-formio';
import testdata from './test-data'


const objUser = local.get('user');

export default class VolunteerList extends Component {
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

        this.keyPressed = this.keyPressed.bind(this);
    }

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
    }

    //Submit Form Data

    submitAdminData = (submission) => {
        // get our form data out of state
        console.log('submitted data keys : ' + Object.keys(submission.data))
    }

    async componentDidMount() {
        const config = {
            method: "POST",
            url: 'https://ayavapp.herokuapp.com/admin/getVolunteerList',
            headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQ3Mjc2MzAsImV4cCI6MTYwNDgxNDAzMH0.jtQ2rClZ5Dxhoce8H54AGSvbsDN8tGGNXcnTQtMqeYQ" }
        }

        axios(config)
            .then((result) => {
                console.log('response data' + result.data.data.length)
                this.setState({ data: result.data.data })
            })
    }

    render() {
        const { loading, isLoaded, data, totalRow, alert } = this.state;

        if (this.state.data) {
            const table = {
                columns: [
                    {
                        name: 'Name',
                        selector: 'name',
                        sortable: true,

                    }, {
                        name: 'Address',
                        selector: 'address',
                        sortable: true,
                        cellExport: d => (
                            {

                            }
                        ),
                    },
                    {
                        name: 'Phone',
                        selector: 'phone',
                        sortable: true,
                        cellExport: d => (
                            {

                            }
                        ),
                    },
                    {
                        name: 'Email',
                        selector: 'email',
                        sortable: true,
                        cellExport: d => (
                            {

                            }
                        ),
                    },

                    {
                        name: 'Status',
                        selector: 'status',
                        sortable: true,
                        cellExport: d => (
                            {

                            }
                        ),
                    },
                    {
                        name: 'Action', right: true,
                        cellExport: d => (
                            {

                            }
                        ),
                        cell: row => <Button className="btn btn-sm" tag="a" href={'#/volunteer-detail/' + row.id}><i className="fa fa-eye"></i> Detail</Button>
                    }
                ],
                data: data

            }

            console.log('data in state ' + this.state.data)

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
                                        tag="a" href={'#/volunteer-register'}
                                        onClick={e => this.setState({ modal: true })}
                                    ><i className="fa fa-plus"></i> Create Volunteer</Button>
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
                                    <div className="card-title">Volunteer List</div>
                                    <div className="card-header-actions">

                                    </div>
                                </div>
                                <div className="card-body label-span-style">
                                    <Row>
                                        <Col>
                                            <DataTableExtensions
                                                columns={table.columns}
                                                data={table.data}
                                                filterPlaceHolder="Dayımlar"
                                                export={false}
                                                print ={false}
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
                                <Modal.Title>Volunteer Registration Form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FormIO
                                    form='https://soaigljodahrapg.form.io/registeradmin'

                                    onSubmit={submission => this.submitAdminData(submission)}
                                    onSubmitDone={a => { }}
                                />
                            </Modal.Body>

                        </Modal>

                    </div>
                </div>
            );
        }
    }
}


export const VolunteerListStory = () => {
    storiesOf('Pagination', module)
        .add('Server-Side', () => <VolunteerList />)
}
