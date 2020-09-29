import React, { Component } from 'react';
import {
  Button,
} from 'reactstrap';
import { ColumnGen } from '../Utils';
import axios from 'axios';


class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      data: {},
      id: props.match.params.id,
      name :'',
      userName : '',
      email:'',
      phone:'',
      
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  async componentDidMount() {

    this.setState({ loading: true });

    const config = {
      headers : {
        'Authorization' : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtoYW50c2l0aHUiLCJpYXQiOjE2MDEzNTA2OTEsImV4cCI6MTYwMTQzNzA5MX0.P5Ar0nrSA_9RdH3fqjcdCyvAIS-pAJUtbwIkYoXkTQk"
      }
    }

    // axios.post('https://ayavapp.herokuapp.com/admin/create', { _id : this.state.data}, config)
    //   .then((result) => {
    //     if (result.status == 200) {
    //      const {name, username, email, phone } = result.data.data;
    //     } else {
    //       alert('Error')
    //     }
    //   });
  }

  render() {
    const { data } = this.state;
    let firstColumnList;
    if (!data) {
      firstColumnList = [];
    } else {

      firstColumnList = [
        { label: "Name", data: 'May', colType: null },
        { label: "Phone Number", data: '09234324324', colType: null },
        { label: "Email", data: 'may@gmail.com', colType: null },
        { label: "Address", data: 'Insein', colType: null },
        { label: "Role", data: 'Admin', colType: null },
      ];
    }

    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <div className="card-title">User Detail Information</div>
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
                  <Button type='button' style={{ width: '100px' }} block onClick={() => { this.approve() }} >{'Edit'}</Button>
                  </div>
                  <div className="col-lg-6">
                  <Button type='button' style={{ width: '100px' }} block onClick={() => { this.approve() }} >{'Delete'}</Button>
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

export default UserDetail;
