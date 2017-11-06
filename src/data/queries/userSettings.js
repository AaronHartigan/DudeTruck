import UserSettingsType from '../types/UserSettingsType';
import UserSettings from '../models/UserSettings';

const settings = {
  type: UserSettingsType,
  resolve(root, args, { user }) {
    return (
      user &&
      UserSettings.findOne({
        where: {
          userId: user.id,
        },
      })
    );
  },
};

export default settings;
