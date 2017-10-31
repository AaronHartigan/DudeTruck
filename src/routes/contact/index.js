import React from 'react';
import Layout from '../../components/Layout';
import Page from '../../components/Page';
import contact from './contact.md';
import isLoggedIn from '../../core/authorization';

function action({ store }) {
  const user = store && store.getState().user;

  return {
    chunks: ['contact'],
    title: contact.title,
    component: (
      <Layout isLoggedIn={isLoggedIn(user)}>
        <Page {...contact} />
      </Layout>
    ),
  };
}

export default action;
