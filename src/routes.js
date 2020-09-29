import React from 'react';
import Loadable from 'react-loadable'

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



const routes = [
    {
        path: '/forgotPass',
        name: 'ForgotPass',
        component: ForgotPass
    },
    { path: '/member-history', name: 'Member History', component: MemberHistory },
    { path: '/member-detail/:id', name: 'Member Detail', component: MemberDetail },
    { path: '/user-history', name: 'User History', component: UserHistory },
    { path: '/user-detail/:id', name: 'User Detail', component: UserDetail },
];

export default routes;