import React from 'react';
import Search from '../../components/Search';

async function action() {
  return {
    chunks: ['search'],
    title: 'Search for a Foodtruck',
    component: <Search />,
  };
}

export default action;
