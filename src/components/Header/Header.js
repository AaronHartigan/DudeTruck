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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './dudetruck_logo.png';

class Header extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation isLoggedIn={this.props.isLoggedIn} />
          <Link className={s.brand} to="/">
            <img src={logoUrl} width="38" height="38" alt="DudeTruck" />
            <span className={s.brandTxt}>DudeTruck</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
