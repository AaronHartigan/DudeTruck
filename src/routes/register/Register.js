import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import isEmail from 'validator/lib/isEmail';
import ReactTooltip from 'react-tooltip';
import FaQuestionCircle from 'react-icons/lib/fa/question-circle';
import validPassword from '../../core/validPassword';
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
      verifyPassword: '',
      validEmail: true,
      validPassword: true,
      validVerifyPassword: true,
      isVendor: false,
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateVerifyPassword = this.validateVerifyPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
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
    const verifyPassword = this.state.verifyPassword;

    let validVerifyPassword = true;
    if (password.length && verifyPassword.length) {
      // if the user has both fields populated and updates their Password
      // check if the verifyPassword is now valid
      validVerifyPassword = password === verifyPassword;
    }

    if (!validPassword(password)) {
      this.setState({
        validPassword: false,
        validVerifyPassword,
        password,
      });
    } else {
      this.setState({
        validPassword: true,
        validVerifyPassword,
        password,
      });
    }
  }

  validateVerifyPassword(event) {
    const password = this.state.password;
    const verifyPassword = event.target.value;

    if (!(password === verifyPassword)) {
      this.setState({
        verifyPassword,
        validVerifyPassword: false,
      });
    } else {
      this.setState({
        verifyPassword,
        validVerifyPassword: true,
      });
    }
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
        <div className={s.container}>
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
            <div className={s.formGroup}>
              <span className={s.typeLabel}>I am a vendor:</span>
              <span className={s.checkbox}>
                <input
                  type="checkbox"
                  name="isVendor"
                  id="isVendor"
                  checked={this.state.isVendor}
                  onChange={this.handleChange}
                />
              </span>
              <span
                data-tip="Check if you own a food truck.<br>As a vendor, you can upload pictures and information about your food truck. <br> Your information will automatically appear in searches."
                className={s.tooltip}
              >
                {' '}
                <span className={s.tooltipIcon}>
                  <FaQuestionCircle />
                </span>
              </span>
              <ReactTooltip multiline />
            </div>
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
      </div>
    );
  }
}

export default withStyles(s)(Register);
