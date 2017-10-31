import React from 'react';
import Layout from '../../components/Layout';
import Logout from './Logout';
import isLoggedIn from '../../core/authorization';
import { loggedOutRedirect } from '../../constants';

const title = 'Log Out';

function action({ store }) {
  const user = store && store.getState().user;
  if (!isLoggedIn(user)) {
    return { redirect: loggedOutRedirect };
  }

  return {
    chunks: ['logout'],
    title,
    component: (
      <Layout isLoggedIn={isLoggedIn(user)}>
        <Logout />
      </Layout>
    ),
  };
}

export default action;
