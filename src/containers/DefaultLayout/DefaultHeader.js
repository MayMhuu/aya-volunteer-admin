import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavbarBrand } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import local from '../../services/local';
import api from '../../services/api';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class DefaultHeader extends Component {
  async onLogoutClick() {
    await api.logout();
    local.clear();
    // this.props.history.push(`/login`)
    window.location.href = '';
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;


    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 145, height: 35, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/users">Users</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem>
        </Nav> */}
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}


          <AppHeaderDropdown direction="down">

            <DropdownToggle nav>
              {/* <p className='mr-3'>Hi {this.props.userInfo.username} !</p> */}
              <img className="img-avatar" src="https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png" alt="Card image cap" />
              {/* <img src={this.props.userInfo.avatar} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
            </DropdownToggle>

            <DropdownMenu right >
              {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem> */}
              {/*<DropdownItem tag={Link} to='/profile?page=43'>
                <i className="fa fa-user"></i> Profile

              </DropdownItem>*/}
              {/* <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem onClick={this.onLogoutClick.bind(this)}><i className="fa fa-lock"></i>Log Out</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

// export default DefaultHeader;
const mapStateToProps = (state) => {
  return { userInfo: state.userInfo }
}
export default connect(mapStateToProps)(DefaultHeader);
// export default withNamespaces();