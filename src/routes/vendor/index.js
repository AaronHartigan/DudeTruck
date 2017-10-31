import React from 'react';
import Layout from '../../components/Layout';
import Vendor from '../../components/Vendor';
import isLoggedIn from '../../core/authorization';
import { loggedOutRedirect } from '../../constants';

async function action({ store }) {
  const user = store && store.getState().user;
  if (!isLoggedIn(user)) {
    return { redirect: loggedOutRedirect };
  }

  return {
    chunks: ['vendorPage'],
    title: 'Vendor Information',
    component: (
      <Layout isLoggedIn={isLoggedIn(user)}>
        <Vendor />
      </Layout>
    ),
  };
}

export default action;
