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
import news from './queries/news';
import truck from './queries/truck';
import trucks from './queries/trucks';
import updateUserSettings from './mutations/userSettings';
import updateVendorSettings from './mutations/vendorSettings';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      user,
      vendor,
      news,
      truck,
      trucks,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      updateUserSettings,
      updateVendorSettings,
    },
  }),
});

export default schema;
