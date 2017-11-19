import User from './models/User';
import UserSettings from './models/UserSettings';
import VendorSettings from './models/VendorSettings';
import { userTypes } from '../constants';

const seed = async function seed() {
  const user1Email = 'user1@gmail.com';
  await User.bulkCreate(
    [
      {
        email: user1Email,
        password: 'testtest',
        type: userTypes.user,
      },
    ],
    {
      individualHooks: true,
      ignoreDuplicates: true,
      // logging: false,
    },
  );
  const user1 = await User.findOne({
    where: {
      email: user1Email,
    },
    // logging: false,
  });

  await UserSettings.update(
    {
      name: 'Leeroy Jenkins',
      age: 21,
      vegan: false,
      vegetarian: false,
      glutenFree: true,
    },
    {
      where: {
        userId: user1.id,
      },
      // logging: false,
    },
  );

  const vendor1Email = 'vendor1@gmail.com';
  await User.bulkCreate(
    [
      {
        email: vendor1Email,
        password: 'testtest',
        type: userTypes.vendor,
      },
    ],
    {
      individualHooks: true,
      ignoreDuplicates: true,
      // logging: false,
    },
  );
  const vendor1 = await User.findOne({
    where: {
      email: vendor1Email,
    },
    // logging: false,
  });

  await VendorSettings.update(
    {
      companyName: 'Toxic Tacos',
      phone: '(916) 123-4567',
      schedule: 'MWF 1pm-6pm',
      lat: 38.56,
      long: -121.426,
      vegan: false,
      vegetarian: true,
      glutenFree: true,
    },
    {
      where: {
        vendorId: vendor1.id,
      },
      // logging: false,
    },
  );

  const vendor2Email = 'vendor2@gmail.com';
  await User.bulkCreate(
    [
      {
        email: vendor2Email,
        password: 'testtest',
        type: userTypes.vendor,
      },
    ],
    {
      individualHooks: true,
      ignoreDuplicates: true,
      // logging: false,
    },
  );
  const vendor2 = await User.findOne({
    where: {
      email: vendor2Email,
    },
    // logging: false,
  });

  await VendorSettings.update(
    {
      companyName: 'StarTruck',
      phone: '(916) 123-4567',
      schedule: 'Sat Sun 5pm-9pm',
      lat: 38.562,
      long: -121.429,
      vegan: true,
      vegetarian: true,
      glutenFree: true,
    },
    {
      where: {
        vendorId: vendor2.id,
      },
      // logging: false,
    },
  );
};

export default seed;
