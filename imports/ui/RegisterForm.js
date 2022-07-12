import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";

export default class RegisterForm extends Component {
  registerUser = e => {
    e.preventDefault();

    Accounts.createUser({
      email: this.email.value,
      password: this.email.value
    },
    error => {
      if(!error) {
        this.props.client.resetStore()
      };
      console.log(error);
    });
  };

  render() {
    return (
      <form className="form-control" onSubmit={this.registerUser}>
        <div className="form-group">
          <label>Email address</label>
          <input
            className="form-control"
            type="email"
            ref={input => (this.email = input)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            ref={input => (this.password = input)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Register</button>
        <button type="button" onClick={() => this.props.onSetLogin(true)} className="btn mt-3">To Login</button>
      </form>
    );
  };
};
