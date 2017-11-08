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
import s from './Footer.css';
import Link from '../Link';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/apps';
import ActionHome from 'material-ui/svg-icons/action/home';


class Footer extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            style={{backgroundColor: deepOrange400}}
            iconElementLeft = {
              <MuiThemeProvider>
                <RaisedButton
                  label="privacy"
                  containerElement={<Link to="/privacy" />}
                />
              </MuiThemeProvider>
            }
            iconElementRight = {
              <div>
                <MuiThemeProvider>
                  <RaisedButton
                    label="help"
                    containerElement={<Link to="/help" />}
                  />
                </MuiThemeProvider>
                <MuiThemeProvider>
                  <RaisedButton
                    label="contact"
                    containerElement={<Link to="/contact" />}
                  />
                </MuiThemeProvider>
              </div>
            }
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
