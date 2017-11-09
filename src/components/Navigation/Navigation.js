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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

class Navigation extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  render() {
    return this.props.isLoggedIn ? (
      <div role="navigation">
        <MuiThemeProvider>
          <div>
            <RaisedButton
              label="settings"
              containerElement={<Link to="/settings" />}
            />
            <RaisedButton
              label="logout"
              containerElement={<Link to="/logout" />}
            />
          </div>
        </MuiThemeProvider>
      </div>
    ) : (
      <div role="navigation">
        <MuiThemeProvider>
          <div>
            <RaisedButton
              label="login"
              containerElement={<Link to="/login" />}
            />
            <RaisedButton
              label="register"
              containerElement={<Link to="/register" />}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
