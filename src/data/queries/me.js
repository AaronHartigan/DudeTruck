/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import UserType from '../types/UserType';
import User from '../models/User';

const me = {
  type: UserType,
  resolve(root, args, { user }) {
    return (
      user &&
      User.find({
        where: {
          id: user.id,
        },
      })
    );
  },
};

export default me;
