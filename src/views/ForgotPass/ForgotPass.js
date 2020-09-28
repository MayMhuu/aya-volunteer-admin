import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormGroup, Label } from 'reactstrap';
import request from '../../services/request.js';
import api from '../../services/api.js';
import local from '../../services/local.js';
import helper from '../../services/helper';
import Loader from '../../controls/Loader';
import config from '../../services/config';
// import AccountKit from 'react-facebook-account-kit';
import { Trans } from 'react-i18next';
import i18next from 'i18next';

class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: true,
      inputOtp: false,
      inputChangePass: false,

      username: '',
      loading: true,
      captchaId: 0,
      captchaText: '',
      captcha: null,
      accountKitToken: ''
    }
  }

  async changeShow(type) {
    if (type == 'inputOtp') {
      this.setState({ inputOtp: true });
      this.setState({ inputChangePass: false });
      this.setState({ inputEmail: false });

    } else if (type == "inputChangePass") {
      this.setState({ inputOtp: false });
      this.setState({ inputChangePass: true });
      this.setState({ inputEmail: false });
    } else {
      this.setState({ inputOtp: false });
      this.setState({ inputChangePass: false });
      this.setState({ inputEmail: true });
    }
  }


  componentDidMount() {
    this.loadCaptcha();
  }
  async loadCaptcha() {
    let captInfo = await api.getCaptcha();
    this.setState({ loading: false, captchaId: captInfo.id, captcha: captInfo.data })
  }
  async resetPass(e) {
    e.preventDefault();
    try {
      if (!this.state.username)
        return helper.alert(i18next.t('Plese enter email'));
      if (!this.state.captchaText)
        return helper.alert(i18next.t('Plese enter capcha'));
      let data = { username: this.state.username, captchaId: this.state.captchaId, captchaText: this.state.captchaText, accountKitToken: this.state.accountKitToken }
      let rs = await api.resetPass(data, config.DEFAULT_TOKEN);
      if (!rs || (rs && rs.err != 200))
        return helper.alert(i18next.t(rs.message));
      if (rs.otp) {
        local.set('session', rs.data.token);
        this.changeShow('inputOtp')
      }
    } catch (err) {
      this.loadCaptcha();
      helper.alert(err.message);
    }
    // return false;
  };
  async resetPassVerifyOTP(e) {
    e.preventDefault();
    try {
      if (!this.state.otp)
        return helper.alert(i18next.t('Plese enter otp'));
      let data = { otp: this.state.otp, token: local.get('session') }
      let rs = await api.resetPassVerifyOTP(data, config.DEFAULT_TOKEN);
      if (!rs || (rs && rs.err != 200)) {
        if (rs.expired == true) {
          this.state = {};
          this.loadCaptcha();
          this.changeShow('inputEmail');
        }
        return helper.alert(i18next.t(rs.message));
      } else {
        local.set('session', rs.data.token);
        this.changeShow('inputChangePass')
      }

    } catch (err) {
      helper.alert(err.message);
    }
  };


  async createNewPass(e) {
    e.preventDefault();
    try {
      let field = await validateForm(Object.assign({}, this.state));
      if (!field || field != true) return
      let data = { password: this.state.password, confirmPassword: this.state.confirmPassword, token: local.get('session') }
      let rs = await api.createNewPass(data, config.DEFAULT_TOKEN);
      if (!rs || (rs && rs.err != 200))
        return helper.alert(i18next.t(rs.message));
      if (rs.expired == true) {
        this.setState({ username: "", captchaText: "", otp: '', password: '', confirmPassword: '' })
        this.loadCaptcha();
        this.changeShow('inputOtp');
      } else {
        local.set('session', rs.data.token);
        return this.props.history.push(`/login`);
      }

    } catch (err) {
      this.loadCaptcha();
      helper.alert(err.message);
    }
    // return false;
  };
  async back(type) {
    this.setState({ username: "", captchaText: "", otp: '', password: '', confirmPassword: '' })
    this.loadCaptcha();
    this.changeShow('inputEmail');

  }
  async login(e) {
    return this.props.history.push(`/login`);
  }

  async handleAccountKitResponse(result) {
    console.log('on token', result);
    this.setState({ accountKitToken: result.code });
  }
  render() {
    if (this.state.loading) return <Loader />
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
                        <img src='assets/img/ayalogo.png' className='login-logo' alt='avatar' />
                      </Col>
                    </Row>

                    {
                      this.state.inputEmail &&
                      (
                        <form onSubmit={this.resetPass.bind(this)} autoComplete='off'>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder={i18next.t('username')} value={this.state.username} onChange={evt => this.setState({ username: evt.target.value })} />
                          </InputGroup>

                          <Row className='mb-4'>
                            <Col md={6}>
                              <div className='captcha' dangerouslySetInnerHTML={{ __html: this.state.captcha }}></div>
                            </Col>
                            <Col md={6}>
                              <InputGroup className="mb-4">
                                <InputGroupAddon addonType="prepend">
                                  <Input type="text" placeholder={i18next.t('Please Enter Captcha')} value={this.state.captchaText} onChange={evt => this.setState({ captchaText: evt.target.value })} />
                                  <InputGroupAddon addonType="prepend">
                                    <Button color='light' type='button' onClick={() => {
                                      this.loadCaptcha();
                                    }}><i className='fa fa-refresh' /></Button>
                                  </InputGroupAddon>
                                </InputGroupAddon>

                              </InputGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12">
                              <Button color="primary" type='submit' className="color-logo-ayapay" block>{i18next.t('submit')}</Button>
                            </Col>

                          </Row>

                          <Row>
                            <Col xs="12" className="text-right">
                              <Button color="link" className="px-0" type='button' block onClick={() => { this.login() }} >{i18next.t('Login')}</Button>
                            </Col>
                          </Row>

                        </form>
                      )
                    }

                    {
                      this.state.inputOtp &&
                      (
                        <form onSubmit={this.resetPassVerifyOTP.bind(this)} autoComplete='off'>
                          <br></br>
                          <Col >
                            <Label htmlFor="name"><Trans i18nKey="A otp had send email .Please check email"></Trans></Label>
                          </Col>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder={i18next.t('Please enter otp')} value={this.state.otp} onChange={evt => this.setState({ otp: evt.target.value })} />
                          </InputGroup>

                          <Row>
                            <Col xs="12">
                              <Button color="primary" type='submit' className="color-logo-ayapay" block>{i18next.t('Vetify otp')}</Button>
                            </Col>

                          </Row>

                          <Row>
                            <Col xs="12" className="text-right">
                              <Button color="link" className="px-0" type='button' block onClick={() => { this.back() }} >{i18next.t('Back')}</Button>
                            </Col>
                          </Row>
                        </form>
                      )
                    }

                    {
                      this.state.inputChangePass &&
                      (
                        <form onSubmit={this.createNewPass.bind(this)} autoComplete='off'>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder={i18next.t('password')} value={this.state.password} onChange={evt => this.setState({ password: evt.target.value })} />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder={i18next.t('confirmPassword')} value={this.state.confirmPassword} onChange={evt => this.setState({ confirmPassword: evt.target.value })} />
                          </InputGroup>
                          <Row>
                            <Col xs="12">
                              <Button color="primary" type='submit' className="color-logo-ayapay" block>{i18next.t('Change password')}</Button>
                            </Col>

                          </Row>
                          <Row>
                            <Col xs="12" className="text-right">
                              <Button color="link" className="px-0" type='button' block onClick={() => { this.back() }} >{i18next.t('Back')}</Button>
                            </Col>
                          </Row>
                        </form>
                      )
                    }


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
async function validateForm(data, type) {

  if (!data.password) return helper.alert(i18next.t("Please enter newpassword"))
  if (!helper.validateInput(data.password, config.REGEX_PASSWORD))
    return helper.alert(i18next.t("Username invalid or too easy please using username different"))
  if (!data.confirmPassword) return helper.alert(i18next.t("Please enter confirm password"));
  if (data.password != data.confirmPassword) return helper.alert(i18next.t("Confirm password in correct"));

  return true


}
export default ForgotPass;



