import React, { Component } from 'react';
import moment from 'moment'
import {
  Button,
} from 'reactstrap';
import { ColumnGen } from '../Utils';
import axios from 'axios';
import nodemailer from 'nodemailer';


class VolunteerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: {},
      id: props.match.params.id
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  approve() {
    const config = {
      method: "POST",
      url: "https://ayavapp.herokuapp.com/admin/approveVolunteer",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtoYW50c2l0aHUiLCJpYXQiOjE2MDQ1NTQ2MTAsImV4cCI6MTYwNDY0MTAxMH0.X3mDt6nxTQdjjX1rsZ38-YesTuqBf5eAVmUdyaNo90E",
        "Content-Type": "application/json"
      },
      data: { "id": this.state.id }
    }
    axios(config)
      .then(result => {
        console.log('result status' + result.status)
        this.goBack();
      })
  }

  reject() {
    const config = {
      method: "POST",
      url: "https://ayavapp.herokuapp.com/admin/rejectVolunteer",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtoYW50c2l0aHUiLCJpYXQiOjE2MDQ1NTQ2MTAsImV4cCI6MTYwNDY0MTAxMH0.X3mDt6nxTQdjjX1rsZ38-YesTuqBf5eAVmUdyaNo90E",
        "Content-Type": "application/json"
      },
      data: { "id": this.state.id }
    }
    axios(config)
      .then(result => {
        console.log('result status' + result.status)
        this.goBack();
      })
  }



  async componentDidMount() {
    const { perPage } = this.state;

    this.setState({ loading: true });

    const config = {
      method: "POST",
      url: "https://ayavapp.herokuapp.com/admin/volunteerDetails",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtoYW50c2l0aHUiLCJpYXQiOjE2MDQ1NTQ2MTAsImV4cCI6MTYwNDY0MTAxMH0.X3mDt6nxTQdjjX1rsZ38-YesTuqBf5eAVmUdyaNo90E",
        "Content-Type": "application/json"
      },
      data: { "id": this.state.id }
    }

    axios(config)
      .then(result => {
        this.setState({ data: result.data.data })
      })




  }

  render() {
    const { id, name, gender, dob, maritalStatus, children, address, phone, email, occupation, education, socialAcc, volunteerExp, availableDate, healthStatus, fluVaccine, tb, insuranceCover } = this.state.data;
    let firstColumnList;
    if (!this.state.data) {
      firstColumnList = [];
    } else {

      firstColumnList = [
        { label: "Name", data: name, colType: null },
        { label: "Gender", data: gender, colType: null },
        { label: "Date of Birth", data: moment(dob).format('YYYY-MM-DD'), colType: null },
        { label: "Martial Status", data: maritalStatus, colType: null },
        { label: "Children", data: children ? "Yes" : "No", colType: null },
        { label: "Address", data: address, colType: null },
        { label: "Phone", data: phone, colType: null },
        { label: "Email", data: email, colType: null },
        { label: "Occupation", data: occupation, colType: null },
        { label: "Education", data: education, colType: null },
        { label: "Social Account", data: socialAcc, colType: null },
        { label: "Volunteer Experience", data: volunteerExp ? "Yes" : "No", colType: null },
        { label: "Available Date", data: moment(availableDate).format('YYYY-MM-DD'), colType: null },
        { label: "Health Status", data: healthStatus ? "Good" : "Bad", colType: null },
        { label: "Measles, Flu vaccine", data: fluVaccine ? "Yes" : "No", colType: null },
        { label: "TB", data: tb ? "Yes" : "No", colType: null },
        { label: "Insurance Coverage", data: insuranceCover ? "Yes" : "No", colType: null },
      ];
    }

    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Volunteer Detail Information</div>
            <div className="card-header-actions">
              <button className="btn-square btn btn-light btn-sm" onClick={this.goBack}><i className="fa fa-arrow-left"></i> Back</button>&nbsp;
              {/*<button className="btn-square btn btn-danger btn-sm"><i className="fa fa-pencil"></i> Edit</button>*/}
            </div>
          </div>
          <div className="card-body label-span-style">
            <div className="row">
              <div className="col-12">
                <ColumnGen columns={firstColumnList} />
              </div>
            </div>
          </div>

          <div className="card-body label-span-style">
            <div className="row">
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-6">
                    <Button type='button' style={{ width: '100px' }} block onClick={() => { this.approve() }} >{'Approve'}</Button>
                  </div>
                  <div className="col-lg-6">
                    <Button type='button' style={{ width: '100px' }} block onClick={() => { this.reject() }} >{'Reject'}</Button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">

              </div>
              <div className="col-lg-4">

              </div>

            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default VolunteerDetail;
