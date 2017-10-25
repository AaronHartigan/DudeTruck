import React from 'react';
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
    component: <Vendor />,
  };
}

export default action;
