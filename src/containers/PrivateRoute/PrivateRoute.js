import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated },
    ...rest
}) => {
   
    return (<Route
        {...rest}
        render={props => !isAuthenticated ?
            (<Redirect to='/' />) : (<Component {...props} />)
        }
    />);
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);