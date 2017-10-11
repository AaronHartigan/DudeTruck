import React from 'react';
import Vendor from '../../components/Vendor';

async function action() {
  return {
    chunks: ['vendorPage'],
    title: 'Vendor Information',
    component: <Vendor />,
  };
}

export default action;
