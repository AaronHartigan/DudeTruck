/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../components/Link';
import s from './Register.css';

class Register extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.titleContainer}>
          <span>Join DudeTruck today.</span>
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
          <div className={s.formGroup}>
            <input
              className={s.input}
              id="verifyPassword"
              type="password"
              name="verifyPassword"
              placeholder="Verify Password"
            />
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
          <span>Already registered? </span>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
