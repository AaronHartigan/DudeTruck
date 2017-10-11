import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../components/Link';
import s from './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.logoContainer}>
          <img src={''} alt="DudeTruck" />
        </div>
        <form method="post">
          <div className={s.formGroup}>
            <input
              className={s.input}
              id="email"
              type="text"
              name="email"
              placeholder="Email Address"
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
          <span>Click </span>
          <Link to="/register">here</Link>
          <span> to sign up</span>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Login);
