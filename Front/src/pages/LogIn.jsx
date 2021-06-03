import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions/userAction';

class _LogIn extends Component {
  state = {
    msg: '',
    logIn: {
      password: 'HX238PyM',
      email: 'sarah@gmail.com',
    },
  }

  componentDidMount() {
    // if (this.props.loggedInUser) {
    //   this.props.history.goBack();
    // }
  }

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({ logIn: { ...prevState.logIn, [name]: value } }));
  }

  onLogIn = ev => {
    ev.preventDefault();

    const { password, email } = this.state.logIn;
    // if (!email || !password) {
    //     return this.setState({ msg: 'Please enter user/password' });
    // }
    const userCreds = { password, email };
    this.props.login(userCreds);
    this.props.history.goBack();
  }

  render() {
    const { password, email } = this.state.logIn;
    return (
      <main>
        <form onSubmit={ this.onLogIn }>
          <input type="email" name="email" value={ email } onChange={ this.handleChange } placeholder="Email" required />
          <input type="password" name="password" value={ password } onChange={ this.handleChange } placeholder="Password" required />
          <button>log In</button>
        </form>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user.users,
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {
  login,
};
export const LogIn = connect(mapStateToProps, mapDispatchToProps)(_LogIn);
