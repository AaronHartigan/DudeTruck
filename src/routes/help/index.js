import React from 'react';
import Layout from '../../components/Layout';
import Page from '../../components/Page';
import help from './help.md';
import isLoggedIn from '../../core/authorization';

function action({ store }) {
  const user = store && store.getState().user;

  return {
    chunks: ['help'],
    title: help.title,
    component: (
      <Layout isLoggedIn={isLoggedIn(user)}>
        <Page {...help} />
      </Layout>
    ),
  };
}

export default action;
