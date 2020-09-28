import React, { Component } from 'react';
import MemberList from './MemberList'
import { Story as TxnHistoryPaginationTableStory } from './MemberList'

export default class MemberHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MemberList />
    );
  }
}
