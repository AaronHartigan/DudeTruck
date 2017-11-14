/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  render() {
    return this.props.isLoggedIn ? (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/search">
          Search
        </Link>
        <span className={s.spacer}>or</span>
        <Link className={cx(s.link, s.highlight)} to="/settings">
          Settings
        </Link>
        <span className={s.spacer}>|</span>
        <Link className={s.link} to="/logout">
          Logout
        </Link>
      </div>
    ) : (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/help">
          Help
        </Link>
        <span className={s.spacer}>|</span>
        <Link className={s.link} to="/login">
          Login
        </Link>
        <span className={s.spacer}>or</span>
        <Link className={cx(s.link, s.highlight)} to="/register">
          Sign Up
        </Link>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
