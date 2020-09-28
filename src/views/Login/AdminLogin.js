import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import request from '../../services/request.js';
import api from '../../services/api.js';
import local from '../../services/local.js';
import helper from '../../services/helper';
import i18next from 'i18next';
import './custom.css';
import AdminIcon from '@material-ui/icons/VerifiedUser';
import LockIcon from '@material-ui/icons/Lock';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: true,
        }
        this.onLoginClick = this.onLoginClick.bind(this)
    }
    componentDidMount() {
        this.loadCaptcha();
    }
    async loadCaptcha() {
        //load captcha
    }
    async onLoginClick(e) {
        e.preventDefault();
        console.log("Event", e)
        try {

            if (!this.state.username)
                return helper.alert(i18next.t('Plese enter username'));
            if (!this.state.password)
                return helper.alert(i18next.t('Plese enter password'));

            //call api
            //  let rs = await api.login({ username: this.state.username, password: this.state.password, accountKitToken: this.state.accountKitToken });
            //  if (!rs || (rs && rs.err != 200))
            //      return helper.alert(i18next.t(rs.message));
            //  local.set('session', rs.data.token);
            // local.set('user', JSON.stringify(rs.data.userInfo));
            // go to dashboard
            console.log("Hi")
            local.set('session', 'waer345678');
            this.props.history.push('/member-history');

        } catch (err) {
            console.log("Error", err)
            helper.alert(err.message);
        }
        // return false;
    };

    async resetPass(e) {
    }

    render() {
        // if (this.state.loading) return <Loader />
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Row>

                                            <Col md={12}>
                                            </Col>
                                        </Row>

                                        <form onSubmit={this.onLoginClick} autoComplete='off'>
                                            {/* <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                  
                                                    </InputGroupText>
                                                </InputGroupAddon>                                           
                                            </InputGroup> */}
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>

                                                        <AdminIcon style={{ 'color': "#20a8d8", height: '20px' }} />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder={'User Name'} value={this.state.username} onChange={evt => this.setState({ username: evt.target.value })} />
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <LockIcon style={{ 'color': "#20a8d8", height: '20px' }} />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder={'Password'} value={this.state.password} autoComplete='off' onChange={evt => this.setState({ password: evt.target.value })} />
                                            </InputGroup>

                                            <Row className='mb-4'>
                                                <Col md={6}>
                                                </Col>
                                                <Col md={6}>

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12">
                                                    <Button color="primary" type='submit' className="btn-square btn btn-primary" block>{'login'}</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0" type='button' block onClick={() => { this.resetPass() }} >{'Forgot password?'}</Button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AdminLogin;
