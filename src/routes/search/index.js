import React from 'react';
import Layout from '../../components/Layout';
import Search from '../../components/Search';
import isLoggedIn from '../../core/authorization';
import { loggedOutRedirect } from '../../constants';

async function action({ store }) {
  const user = store && store.getState().user;
  if (!isLoggedIn(user)) {
    return { redirect: loggedOutRedirect };
  }

  return {
    chunks: ['search'],
    title: 'Search for a Foodtruck',
    component: (
      <Layout isLoggedIn={isLoggedIn(user)}>
        <Search />
      </Layout>
    ),
  };
}

export default action;
