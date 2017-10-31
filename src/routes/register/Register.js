import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import isEmail from 'validator/lib/isEmail';
import validPassword from '../../core/validPassword';
import { userTypes } from '../../constants';
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
      selectValue: userTypes.user,
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateVerifyPassword = this.validateVerifyPassword.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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

  handleSelect(event) {
    this.setState({ selectValue: event.target.value });
  }

  render() {
    let errors = this.props.query.errors;
    errors = typeof errors === 'string' ? JSON.parse(errors) : [];
    errors = errors.map((err, idx) => (
      <div key={idx.toString()} className={s.error}>
        {err}
      </div>
    ));

    return (
      <div className={s.root}>
        <div className={s.titleContainer}>
          <span>Join DudeTruck today.</span>
        </div>
        {errors}
        <form method="post">
          <span>I am...</span>
          <select
            id="type"
            name="type"
            value={this.state.selectValue}
            onChange={this.handleSelect}
          >
            <option value={userTypes.user}>looking for food</option>
            <option value={userTypes.vendor}>a food truck vendor</option>
          </select>
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
          {!this.state.validEmail && (
            <div className={s.error}>Invalid email address</div>
          )}
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
          {!this.state.validPassword && (
            <div className={s.error}>Invalid password</div>
          )}
          <div className={s.requirements}>
            * Password must be 8 characters or longer.
          </div>
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
          {!this.state.validVerifyPassword && (
            <div className={s.error}>Passwords must match</div>
          )}
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
          Already registered? <Link to="/login">Log in</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
