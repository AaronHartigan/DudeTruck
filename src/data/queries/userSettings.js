import UserSettingsType from '../types/UserSettingsType';
import User from '../models/User';

const userSettings = {
  type: UserSettingsType,
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

export default userSettings;
