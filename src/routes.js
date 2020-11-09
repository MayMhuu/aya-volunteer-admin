import React from 'react';
import Loadable from 'react-loadable'
import { DefaultLayout } from './containers';

function Loading() {
    return <div>Loading...</div>;
}

const ForgotPass = Loadable({
    loader: () => import('./views/ForgotPass/ForgotPass'),
    loading: Loading
});

const MemberHistory = React.lazy(() => import('./views/MemberHistory/MemberHistory'));
const MemberDetail = React.lazy(() => import('./views/MemberHistory/MemberDetail'));
const UserHistory = React.lazy(() => import('./views/UserManagement/UserHistory'));
const UserDetail = React.lazy(() => import('./views/UserManagement/UserDetail'));
const VolunteerHistory = React.lazy(() => import('./views/VolunteerManagement/VolunteerList'));
const VolunteerDetail = React.lazy(() => import('./views/VolunteerManagement/VolunteerDetail'));
const RegisterVolunteer = React.lazy(() => import('./views/VolunteerManagement/RegisterVolunteer'))



const routes = [
    {
        path: '/forgotPass',
        name: 'ForgotPass',
        component: ForgotPass
    },
    { path: '/admin/member-history', name: 'Member History', component: MemberHistory },
    { path: '/admin/member-detail/:id', name: 'Member Detail', component: MemberDetail },
    { path: '/admin/user-history', name: 'User History', component: UserHistory },
    { path: '/admin/user-detail/:id', name: 'User Detail', component: UserDetail },
    { path: '/admin/volunteer-history', name: 'Volunteer History', component: VolunteerHistory },
    { path: '/admin/volunteer-detail/:id', name: 'Volunteer Detail', component: VolunteerDetail },
    { path: '/admin/volunteer-register', name: 'Volunteer Register', component: RegisterVolunteer },

    


];

export default routes;
