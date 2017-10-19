import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import isEmail from 'validator/lib/isEmail';
import validPassword from '../../core/validPassword';
import { errorMessages } from '../../constants';
import Link from '../../components/Link';
import s from './Register.css';

class Register extends React.Component {
  static propTypes = {
    query: PropTypes.shape({
      email: PropTypes.string,
      errors: PropTypes.string,
    }),
  };

  static defaultProps = {
    query: {
      email: '',
      errors: '',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      validEmail: true,
      validPassword: true,
      validVerifyPassword: true,
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateVerifyPassword = this.validateVerifyPassword.bind(this);
  }

  validateEmail(event) {
    const email = event.target.value;

    if (!isEmail(email)) {
      this.setState({ validEmail: false });
    } else {
      this.setState({ validEmail: true });
    }
  }

  validatePassword(event) {
    const password = event.target.value;

    if (!validPassword(password)) {
      this.setState({
        validPassword: false,
        password,
      });
    } else {
      this.setState({
        validPassword: true,
        password,
      });
    }
  }

  validateVerifyPassword(event) {
    const password = this.state.password;
    const verifyPassword = event.target.value;

    if (!(password === verifyPassword)) {
      this.setState({ validVerifyPassword: false });
    } else {
      this.setState({ validVerifyPassword: true });
    }
  }

  render() {
    // TODO: change to strings
    let errors = this.props.query.errors;
    errors = typeof errors === 'string' ? JSON.parse(errors) : [];
    errors = errors.map(err => (
      <div key={err.toString()}>{errorMessages[err]}</div>
    ));

    return (
      <div className={s.root}>
        <div className={s.titleContainer}>
          <span>Join DudeTruck today.</span>
        </div>
        {errors}
        <form method="post">
          <div className={s.formGroup}>
            <input
              className={s.input}
              id="email"
              type="text"
              name="email"
              placeholder="Email Address"
              onChange={this.validateEmail}
              defaultValue={this.props.query.email}
            />
          </div>
          {!this.state.validEmail && <div>Invalid email address</div>}
          <div className={s.formGroup}>
            <input
              className={s.input}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.validatePassword}
            />
          </div>
          {!this.state.validPassword && <div>Invalid password</div>}
          <div className={s.formGroup}>
            <input
              className={s.input}
              id="verifyPassword"
              type="password"
              name="verifyPassword"
              placeholder="Verify Password"
              onChange={this.validateVerifyPassword}
            />
          </div>
          {!this.state.validVerifyPassword && <div>Passwords must match</div>}
          <div className={[s.buttonContainer, s.formGroup].join(' ')}>
            <button
              className={s.button}
              onClick={this.handleClick}
              type="submit"
            >
              SIGN UP
            </button>
          </div>
        </form>
        <div className={s.registration}>
          <span>Already registered? </span>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
