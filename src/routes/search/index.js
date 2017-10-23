import React from 'react';
import Layout from '../../components/Layout';
import Search from '../../components/Search';

async function action() {
  return {
    chunks: ['search'],
    title: 'Search for a Foodtruck',
    component: (
      <Layout>
        <Search />
      </Layout>
    ),
  };
}

export default action;
