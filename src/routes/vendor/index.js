import React from 'react';
import Layout from '../../components/Layout';
import Vendor from '../../components/Vendor';
import isLoggedIn from '../../core/authorization';
import { loggedOutRedirect } from '../../constants';

async function action({ params, store, fetch }) {
  const user = store && store.getState().user;
  if (!isLoggedIn(user)) {
    return { redirect: loggedOutRedirect };
  }

  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: `
        query truckInfo ($id: ID!) {
          truck(id: $id) {
            logo,
            companyName,
            description,
            phone,
            schedule,
            lat,
            long,
            vegan,
            vegetarian,
            glutenFree,
            vendorId,
          }
          rating(id: $id) {
            rating,
            count,
          }
        }
      `,
      variables: {
        id: params.id,
      },
    }),
  });
  const { data } = await resp.json();

  const hasError = !(data && data.truck && data.rating);
  const truckData = data && data.truck;
  const ratingData = data && data.rating;

  return {
    chunks: ['vendorPage'],
    title: 'Vendor Information',
    component: (
      <Layout isLoggedIn={isLoggedIn(user)}>
        <Vendor
          error={hasError}
          ratingId={params.id}
          truck={truckData}
          rating={ratingData}
        />
      </Layout>
    ),
  };
}

export default action;
