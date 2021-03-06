import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      password2: null,
      email: null,
      passmsg: null
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = () => {
    const { password, password2 } = this.state;
    if (password != password2) {
      this.setState({ passmsg: "Passwords do not match." });
    } else {
      this.props.registerUser(this.state);
    }
  };

  render() {
    return (
      <div className="container form">
        <div className="form-title">Register</div>
        <div className="form-box">
          <input
            className="form-input"
            id="username"
            name="username"
            placeholder="Username"
            required
            onChange={this.onChange}
          />
          <input
            className="form-input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={this.onChange}
          />
          <input
            className="form-input"
            id="password2"
            name="password2"
            type="password"
            placeholder="Confirm Password"
            required
            onChange={this.onChange}
          />
          <input
            className="form-input"
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            required
            onChange={this.onChange}
          />
          <a onClick={() => this.onSubmit()} className="form-btn">
            Register
          </a>
          <p className="msg">
            {this.props.auth.registration.msg}
            {this.state.passmsg}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  registerUser: e => dispatch(registerUser(e))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
