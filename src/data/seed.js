import User from './models/User';
import UserSettings from './models/UserSettings';
import VendorSettings from './models/VendorSettings';
import { userTypes } from '../constants';

async function createUser(email, options) {
  await User.findCreateFind({
    where: {
      email,
    },
    defaults: {
      password: options.password,
      type: userTypes.user,
    },
  });

  const user = await User.findOne({
    where: {
      email,
    },
  });

  await UserSettings.update(
    {
      name: options.name,
      age: options.age,
      vegan: options.vegan,
      vegetarian: options.vegetarian,
      glutenFree: options.glutenFree,
    },
    {
      where: {
        userId: user.id,
      },
    },
  );
}

async function createVendor(email, options) {
  await User.findCreateFind({
    where: {
      email,
    },
    defaults: {
      password: options.password,
      type: userTypes.vendor,
    },
  });

  const vendor = await User.findOne({
    where: {
      email,
    },
  });

  await VendorSettings.update(
    {
      companyName: options.companyName,
      phone: options.phone,
      schedule: options.schedule,
      lat: options.lat,
      long: options.long,
      vegan: options.vegan,
      vegetarian: options.vegetarian,
      glutenFree: options.glutenFree,
    },
    {
      where: {
        vendorId: vendor.id,
      },
    },
  );
}

const seed = async function seed() {
  createUser('user1@gmail.com', {
    password: 'testtest',
    name: 'Leeroy Jenkins',
    age: 21,
    vegan: false,
    vegetarian: false,
    glutenFree: true,
  });

  createVendor('vendor1@gmail.com', {
    password: 'testtest',
    companyName: 'Toxic Tacos',
    phone: '(916) 123-4567',
    schedule: 'MWF 1pm-6pm',
    lat: 38.56,
    long: -121.426,
    vegan: false,
    vegetarian: true,
    glutenFree: true,
  });

  createVendor('vendor2@gmail.com', {
    password: 'testtest',
    companyName: 'StarTruck',
    phone: '(916) 123-4567',
    schedule: 'Sat Sun 5pm-9pm',
    lat: 38.562,
    long: -121.429,
    vegan: true,
    vegetarian: true,
    glutenFree: true,
  });

  createVendor('vendor3@gmail.com', {
    password: 'testtest',
    companyName: "Swaine's Brains",
    phone: '(916) 123-4567',
    schedule: 'Mon-Fri 1pm-7pm',
    lat: 38.563,
    long: -121.4285,
    vegan: false,
    vegetarian: true,
    glutenFree: false,
  });

  createVendor('vendor4@gmail.com', {
    password: 'testtest',
    companyName: 'Burgatory',
    phone: '(916) 123-4567',
    schedule: 'Mon-Fri 1pm-7pm',
    lat: 38.553,
    long: -121.4265,
    vegan: false,
    vegetarian: false,
    glutenFree: true,
  });
};

export default seed;