import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../components/Link';
import s from './Login.css';

class Login extends React.Component {
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
          <span>Welcome back.</span>
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
              defaultValue={this.props.query.email}
            />
          </div>
          <div className={s.formGroup}>
            <input
              className={s.input}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className={[s.buttonContainer, s.formGroup].join(' ')}>
            <button className={s.button} type="submit">
              LOG IN
            </button>
          </div>
        </form>
        <div className={s.registration}>
          Click <Link to="/register">here</Link> to sign up
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Login);
