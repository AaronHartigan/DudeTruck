import User from './models/User';
// import UserSettings from './models/UserSettings';
// import VendorSettings from './models/VendorSettings';
import { userTypes } from '../constants';

const seed = async function seed() {
  await User.create(
    {
      email: 'user1@gmail.com',
      password: 'testtest',
      type: userTypes.user,
    },
    { logging: false },
  );

  await User.create(
    {
      email: 'vendor1@gmail.com',
      password: 'testtest',
      type: userTypes.vendor,
    },
    { logging: false },
  );
};

export default seed;
