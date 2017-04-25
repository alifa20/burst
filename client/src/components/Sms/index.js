// src/components/User/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import './style.css';
import logo from './logo.svg';
import axios from 'axios';

class Sms extends Component {
  constructor(props) {
    super(props);
    this.state = { phone: '', body: '', resultMessage: '' };

    // This binding is necessary to make `this` work in the callback
    this.handleBody = this.handleBody.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.sendSms = this.sendSms.bind(this);
  }

  handleBody(e) {
    this.setState({ body: e.target.value });
  }

  handlePhone(e) {
    this.setState({ phone: e.target.value });
  }

  sendSms(e) {
    e.preventDefault();
    console.log('The link was clicked.', this.state.body);
    const payload = { phone: this.state.phone, body: this.state.body };
    axios.post('/sms', payload)
      .then(res => {
        console.log(res.data);
        this.setState({ resultMessage: 'SMS sent successfully' });
        return res;
      })
      .catch(err => {
        console.log(err);
        this.setState({ resultMessage: 'Error happened please try later.' });
        return err;
      });
  }

  render() {
    const { className } = this.props;
    return (
      <div className={classnames('App', className)}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="User">
          <h1>Send sms</h1>
          phone:
        <br />
          <input type='text' name='phone' onChange={this.handlePhone} />
          <br />
          Message:
        <br />
          <textArea name='body' onChange={this.handleBody} />
          <br />
          <input type='submit' value="send" onClick={this.sendSms} />
          <br />
          {this.state.resultMessage}
        </div>
      </div>
    );
  }
}

export default Sms;
