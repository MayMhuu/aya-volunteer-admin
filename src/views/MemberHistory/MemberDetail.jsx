import React, { Component } from 'react';
import moment from 'moment'
import {
  Button,
} from 'reactstrap';
import { ColumnGen } from '../Utils';
import api from '../../services/api.js';
import local from '../../services/local.js';
import helper from '../../services/helper';
import request from '../../services/request';


class MemberDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: {},
      id: props.match.params.id,
      status: null,
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  async componentDidMount() {

    this.setState({ loading: true });

    let objParams = {
      id: this.state.id,
    }
    let result = await api.memberDetail(objParams);
    console.log("Response", result);
    if (!result || (result && result.code != 200))
      return helper.alert(result.message);

    this.setState({
      loading: false,
      data: result.data,
      status: result.data.status
    });
  }

  async approve() {
    try {

      // call api
      let rs = await api.approve({ id: this.state.id });
      console.log("Response", rs);
      if (!rs || (rs && rs.code != 200))
        return helper.alert(rs.message);

      //data bind
      this.getDetail(this.state.id);

    } catch (err) {
      console.log("Error", err)
      helper.alert(err.message);
    }
  };


  async reject() {
    try {
      // call api
      console.log("ID", this.state.id)
      let rs = await api.reject({ id: this.state.id });
      console.log("Response", rs);
      if (!rs || (rs && rs.code != 200))
        return helper.alert(rs.message);
      //data bind
      this.getDetail(this.state.id);

    } catch (err) {
      console.log("Error", err)
      helper.alert(err.message);
    }
  };

  async getDetail(id) {
    let result = await api.memberDetail({ id: id });
    console.log("Response", result);
    if (!result || (result && result.code != 200))
      return helper.alert(result.message);

    this.setState({
      loading: false,
      data: result.data,
      status: result.data.status
    });
  }

  render() {
    const { data } = this.state;
    let firstColumnList, secondColumnList, receiverColumnsList, thirdColumnList, fourthColumnList;
    if (!data) {
      firstColumnList = [];
    } else {
      firstColumnList = [
        { label: "Name", data: data.name, colType: null },
        { label: "Phone Number", data: data.phone, colType: null },
        { label: "Email", data: data.email, colType: null },
        {
          label: "Status", data:
            <div class="row ">
              <label class="col-sm-2 col-form-label" >Status</label>
              <Button class="col-sm-10" color={data.status === 'approved' ? "success" : "danger"} size="sm">
                <i className="fa fa-check"></i>
                {data.status}
              </Button>
            </div>
          , colType: 'callComponent'
        },
      ];
    }

    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Member Detail Information</div>
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

          <div className="card-body">
            <div className="row">
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-3">
                    <Button type='button' disabled={this.state.status === 'rejected'  || this.state.status === 'approved' ? true : false} style={{ width: '100px' }} block onClick={() => { this.approve() }} >{'Approve'}</Button>
                  </div>
                  <div className="col-lg-3">
                    <Button type='button' disabled={this.state.status === 'rejected' || this.state.status === 'pending' ? true : false} style={{ width: '100px', paddingLeft: '2px' }} block onClick={() => { this.reject() }} >{'Reject'}</Button>
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

export default MemberDetail;
