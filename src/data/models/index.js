/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import User from './User';
import Vendor from './Vendor';
import Feedback from './Feedback';

User.hasMany(Feedback, {
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
  as: 'feedbacks',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Vendor.hasMany(Feedback, {
  foreignKey: {
    allowNull: false,
    name: 'vendorId',
  },
  as: 'feedbacks',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, Vendor, Feedback };
