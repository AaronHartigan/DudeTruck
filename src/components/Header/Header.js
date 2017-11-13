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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';

class Header extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  render() {
    return this.props.isLoggedIn ? (
      <div className={s.root}>
        <MuiThemeProvider>
          <AppBar
            style={{ backgroundColor: '#455A64' }}
            iconElementRight={
              <RaisedButton
                label="nav"
                containerElement={
                  <Navigation isLoggedIn={this.props.isLoggedIn} />
                }
              />
            }
            iconElementLeft={
              <RaisedButton
                label="search"
                containerElement={
                  <Link to="/search">
                    <div />
                  </Link>
                }
              />
            }
          />
        </MuiThemeProvider>
      </div>
    ) : (
      <div className={s.root}>
        <MuiThemeProvider>
          <AppBar
            style={{ backgroundColor: '#455A64' }}
            iconElementRight={
              <RaisedButton
                label={'Nav'}
                containerElement={
                  <Navigation isLoggedIn={this.props.isLoggedIn} />
                }
              />
            }
            iconElementLeft={
              <IconButton
                containerElement={
                  <Link to="/">
                    <div />
                  </Link>
                }
              >
                <ActionHome />
              </IconButton>
            }
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(s)(Header);
