import React, { Component } from 'react';
import moment from 'moment'
import {
  Button,
} from 'reactstrap';
import { ColumnGen } from '../Utils';
import api from '../../services/api';


class MemberDetail extends Component {
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

  async componentDidMount() {
    const { perPage } = this.state;

    this.setState({ loading: true });

    let objParams = {
      id: this.state.id,
    }
    // let result = await api.detailMember(objParams);

    // this.setState({
    //   loading: false,
    //   data: result.data
    // });
  }

  render() {
    const { data } = this.state;
    let firstColumnList, secondColumnList, receiverColumnsList, thirdColumnList, fourthColumnList;
    if (!data) {
      firstColumnList = [];
    } else {

      firstColumnList = [
        { label: "Name", data: 'May', colType: null },
        { label: "Phone Number", data: '09234324324', colType: null },
        { label: "Email", data: 'may@gmail.com', colType: null },
        { label: "Address", data: 'Insein', colType: null },
        { label: "Status", data: 'Pending', colType: null },
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

          <div className="card-body label-span-style">
            <div className="row">
              <div className="col-lg-4">
              <div className="row">
                  <div className="col-lg-6">
                  <Button type='button' style={{ width: '100px' }} block onClick={() => { this.approve() }} >{'Approve'}</Button>
                  </div>
                  <div className="col-lg-6">
                  <Button type='button' style={{ width: '100px' }} block onClick={() => { this.approve() }} >{'Reject'}</Button>
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
