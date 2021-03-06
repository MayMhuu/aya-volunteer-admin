import React, { Component } from 'react';
import { FormControlLabel } from '@material-ui/core';

export default class ColumnGen extends Component {
  render() {
    const { columns } = this.props;
    const listItems = columns.map(obj => obj.colType === 'callComponent' ?
      obj.data :
      // <label key={obj.label} className="form-control-1">
      //   <span>{obj.label}</span>   {obj.data}
      // </label>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">{obj.label}</label>
        <div class="col-sm-10">
          <input type="text" readonly class="form-control-plaintext"  value={obj.data}></input>
        </div>
      </div>
    );
    return (
      <div>{listItems}</div>
    );
  }
}
