import React, { Component } from 'react';
import UserList from './UserList'

export default class UserHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <UserList />
    );
  }
}
