/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Register from './Register';
import isLoggedIn from '../../core/authorization';
import { loggedInRedirect } from '../../constants';

const title = 'New User Registration';

function action({ store, query }) {
  const user = store && store.getState().user;
  if (isLoggedIn(user)) {
    return { redirect: loggedInRedirect };
  }

  return {
    chunks: ['register'],
    title,
    component: (
      <Layout>
        <Register query={query} />
      </Layout>
    ),
  };
}

export default action;
