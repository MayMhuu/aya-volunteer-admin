import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegisterVolunteer from '../../views/VolunteerManagement/RegisterVolunteer';

const routes = [
    { path: '/vol/register', name: 'Register Volunteer', component: RegisterVolunteer },
]
const RegisterLayout = () => {
    return (
        <div>
            This is Registration
            <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                    )} />)
                        : (null);
                },
                )}
                <Redirect from="/" to="/vol/register" />
            </Switch>
        </div>
    )
};

export default RegisterLayout;