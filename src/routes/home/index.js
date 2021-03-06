/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import isLoggedIn from '../../core/authorization';
import { loggedInRedirect } from '../../constants';

async function action({ store }) {
  const user = store && store.getState().user;
  if (isLoggedIn(user)) {
    return { redirect: loggedInRedirect };
  }

  return {
    chunks: ['home'],
    title: 'DudeTruck',
    component: (
      <Layout isLoggedIn={isLoggedIn(user)}>
        <Home />
      </Layout>
    ),
  };
}

export default action;
