/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import MeType from '../types/MeType';
import User from '../models/User';
import Vendor from '../models/Vendor';

const me = {
  type: MeType,
  async resolve(root, args, { user }) {
    let meObject;
    meObject = await User.findOne({
      where: {
        id: user.id,
      },
    });
    if (!meObject) {
      meObject = await Vendor.findOne({
        where: {
          id: user.id,
        },
      });
    }

    return meObject;
  },
};

export default me;
