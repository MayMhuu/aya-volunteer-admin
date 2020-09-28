import React, { Component } from 'react';
import {
  Button,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Badge,
  FormGroup,
  Label,
  Input,
  Row,
} from 'reactstrap';
import moment from 'moment';
import { DateRangePicker } from 'rsuite';
import { Bar, Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import DataTable from 'react-data-table-component';
import config  from '../../services/config';
import local  from '../../services/local';
import api  from '../../services/api';
import shareData  from '../../services/shareData';

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  legend:{
    display: true
  },
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      type: 'linear',
      display: true,
      position: 'left',
      id: 'y-axis-1',
    }, {
      type: 'linear',
      display: true,
      position: 'right',
      id: 'y-axis-2',
      gridLines: {
        drawOnChartArea: false,
      },
    }],
  }
}


class Dashboards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded:false,
      loading: false,
      balanceLoading: false,
      error: null,
      data: {},
      msrBar: {},
      ssrBar: {},
      tsm:"",
      startDate: "",
      endDate: "",
      startDateShop: "",
      endDateShop: "",
      startDateTss: "",
      endDateTss: "",
      startDateTssm: "",
      endDateTssm: "",
      shopSellingData: [],
      ssColumns:[],
      subMSellingData: [],
      subMColumns: [],
      balance: 0,
      merchantSaleRp: {},
      shopSaleRp: {},
      shopSelleingLoading: false,
      submcSellingLoading: false
    };
  }

  componentDidMount() {
 
  }

  render() {
    let {merchantSaleRp, shopSaleRp} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
           
          </Col>
          <Col xs="12" sm="6" lg="3">

          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" lg="12">
           
          </Col>

        </Row>

        <Row>
          <Col xs="12" sm="6" lg="6">
           
          </Col>

          <Col xs="12" sm="6" lg="6">
           
          </Col>
        </Row>
        
      </div>
    );
  }
}

export default Dashboards;