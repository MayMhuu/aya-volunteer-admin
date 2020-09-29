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
        <p className='mr-3'>Ayeyarwady Volunteer</p>
        {/* <AppNavbarBrand
          full={{ src: logo, width: 145, height: 35, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        /> */}
        <AppSidebarToggler className="d-md-down-none" display="lg" style={{ "padding-bottom": '10px' }} />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              {/* <p className='mr-3'>Ayeyarwady Volunteer</p> */}
              {/* <img className="img-avatar" src="https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png" alt="Card image cap" /> */}
              {/* <img src={this.props.userInfo.avatar} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
            </DropdownToggle>

            <DropdownMenu right >
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