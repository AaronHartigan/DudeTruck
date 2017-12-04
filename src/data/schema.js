/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import user from './queries/userSettings';
import vendor from './queries/vendorSettings';
import truck from './queries/truck';
import trucks from './queries/trucks';
import rating from './queries/rating';
import myReview from './queries/myReview';
import logo from './mutations/logo';
import feedbackList from './queries/feedback';
import feedback from './mutations/feedback';
import updateUserSettings from './mutations/userSettings';
import updateVendorSettings from './mutations/vendorSettings';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      user,
      vendor,
      truck,
      trucks,
      myReview,
      rating,
      feedbackList,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      logo,
      feedback,
      updateUserSettings,
      updateVendorSettings,
    },
  }),
});

export default schema;
