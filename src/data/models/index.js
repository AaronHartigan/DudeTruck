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
import UserSettings from './UserSettings';
import VendorSettings from './VendorSettings';
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

UserSettings.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

VendorSettings.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: 'vendorId',
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserSettings, VendorSettings, Feedback };
