import React from 'react';
import Layout from '../../components/Layout';
import SettingsVendor from '../../components/Settings/Vendor';
import SettingsUser from '../../components/Settings/User';

const title = 'Settings';
const isVendor = false;

function action() {
  if (isVendor) {
    return {
      chunks: ['settings'],
      title,
      component: (
        <Layout>
          <SettingsVendor />
        </Layout>
      ),
    };
  }

  return {
    chunks: ['settings'],
    title,
    component: (
      <Layout>
        <SettingsUser />
      </Layout>
    ),
  };
}

export default action;
