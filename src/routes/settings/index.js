import React from 'react';
import Layout from '../../components/Layout';
import SettingsVendor from '../../components/Settings/Vendor';
import SettingsUser from '../../components/Settings/User';
import isLoggedIn from '../../core/authorization';
import { userTypes, loggedOutRedirect } from '../../constants';

const title = 'Settings';

async function action({ store, fetch }) {
  const user = store && store.getState().user;
  if (!isLoggedIn(user)) {
    return { redirect: loggedOutRedirect };
  }

  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{me{type}}',
    }),
  });

  const { data } = await resp.json();

  if (!data || !data.me) {
    throw new Error('Unable to fetch account data');
  }

  let page;
  if (data.me.type === userTypes.vendor) {
    const settingsResp = await fetch('/graphql', {
      body: JSON.stringify({
        query:
          '{vendor{logo,companyName,description,phone,schedule,lat,long,vegan,vegetarian,glutenFree}}',
      }),
    });

    const settingsData = await settingsResp.json();

    if (!settingsData || !settingsData.data) {
      throw new Error('Unable to fetch account data');
    }

    page = (
      <Layout isLoggedIn={isLoggedIn(user)}>
        <SettingsVendor settings={settingsData.data.vendor} />
      </Layout>
    );
  } else if (data.me.type === userTypes.user) {
    const settingsResp = await fetch('/graphql', {
      body: JSON.stringify({
        query: '{user{name,age,vegan,vegetarian,glutenFree}}',
      }),
    });

    const settingsData = await settingsResp.json();

    if (!settingsData || !settingsData.data) {
      throw new Error('Unable to fetch account data');
    }

    page = (
      <Layout isLoggedIn={isLoggedIn(user)}>
        <SettingsUser settings={settingsData.data.user} />
      </Layout>
    );
  } else {
    throw new Error('User account type is invalid.  Please contact support.');
  }

  return {
    chunks: ['settings'],
    title,
    component: page,
  };
}

export default action;
