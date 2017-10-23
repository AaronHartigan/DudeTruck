import React from 'react';
import Layout from '../../components/Layout';
import SettingsVendor from '../../components/Settings/Vendor';
import SettingsUser from '../../components/Settings/User';
import { userTypes } from '../../constants';

const title = 'Settings';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{me{type}}',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.me) {
    throw new Error('Unable to fetch account data');
  }

  if (data.me.type === userTypes.vendor) {
    return {
      chunks: ['settings'],
      title,
      component: (
        <Layout>
          <SettingsVendor />
        </Layout>
      ),
    };
  } else if (data.me.type === userTypes.user) {
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
  throw new Error('User account type is invalid.  Please contact support.');
}

export default action;
