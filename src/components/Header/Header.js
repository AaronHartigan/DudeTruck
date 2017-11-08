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
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import {cyanA200} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

class Header extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  render() {
    return this.props.isLoggedIn ? (
      <div>
        <MuiThemeProvider>
          <AppBar
            style={{backgroundColor: cyanA200}}
            iconElementRight = {
              <RaisedButton
                containerElement={<Navigation isLoggedIn={this.props.isLoggedIn} />}
              />
            }
            iconElementLeft = {
              <RaisedButton
                label="search"
                containerElement={<Link to="/search" />}
              />
            }
          />
        </MuiThemeProvider>
      </div>
      ) : (
        <div>
          <MuiThemeProvider>
            <AppBar
              style={{backgroundColor: cyanA200}}
              iconElementRight = {
                <RaisedButton
                  containerElement={<Navigation isLoggedIn={this.props.isLoggedIn} />}
                />
              }
              iconElementLeft = {
                <IconButton
                  containerElement={<Link to="/" />}
                  linkButton={true}>
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
