import User from './models/User';
import UserSettings from './models/UserSettings';
import VendorSettings from './models/VendorSettings';
import Feedback from './models/Feedback';
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
      logo: options.logo,
      phone: options.phone,
      schedule: options.schedule,
      description: options.description,
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

async function createReview(userEmail, vendorEmail, options) {
  const user = await User.findOne({
    where: {
      email: userEmail,
    },
  });

  const vendor = await User.findOne({
    where: {
      email: vendorEmail,
    },
  });

  if (!user || !vendor) {
    console.log('Unable to create Reviews'); // eslint-disable-line no-console
    return;
  }

  Feedback.findCreateFind({
    where: {
      reviewerId: user.id,
      revieweeId: vendor.id,
    },
    defaults: {
      review: options.review,
      rating: options.rating,
    },
  });
}

const seed = async function seed() {
  await createUser('user1@gmail.com', {
    password: 'testtest',
    name: 'Leeroy Jenkins',
    age: 21,
    vegan: false,
    vegetarian: false,
    glutenFree: true,
  });

  await createVendor('vendor1@gmail.com', {
    password: 'testtest',
    companyName: 'Toxic Tacos',
    logo:
      'https://s3-us-west-1.amazonaws.com/dudetruck-logos/logos/default.jpg',
    description: 'Tacos that make you wish you had not ordered our food.',
    phone: '(916) 123-4567',
    schedule: 'MWF 1pm-6pm',
    lat: 38.56,
    long: -121.426,
    vegan: false,
    vegetarian: true,
    glutenFree: true,
  });

  await createVendor('vendor2@gmail.com', {
    password: 'testtest',
    companyName: 'StarTruck',
    logo:
      'https://s3-us-west-1.amazonaws.com/dudetruck-logos/logos/default.jpg',
    description: 'Coffee, with a twist.',
    phone: '(916) 123-4567',
    schedule: 'Sat Sun 5pm-9pm',
    lat: 38.562,
    long: -121.429,
    vegan: true,
    vegetarian: true,
    glutenFree: true,
  });

  await createVendor('vendor3@gmail.com', {
    password: 'testtest',
    companyName: "Swaine's Brains",
    logo:
      'https://s3-us-west-1.amazonaws.com/dudetruck-logos/logos/default.jpg',
    description: 'A Halloween classic!',
    phone: '(916) 123-4567',
    schedule: 'Mon-Fri 1pm-7pm',
    lat: 38.563,
    long: -121.4285,
    vegan: false,
    vegetarian: true,
    glutenFree: false,
  });

  await createVendor('vendor4@gmail.com', {
    password: 'testtest',
    companyName: 'Burgatory',
    logo:
      'https://s3-us-west-1.amazonaws.com/dudetruck-logos/logos/default.jpg',
    description: 'Are you ready?',
    phone: '(916) 123-4567',
    schedule: 'Mon-Fri 1pm-7pm',
    lat: 38.553,
    long: -121.4265,
    vegan: true,
    vegetarian: false,
    glutenFree: true,
  });

  await createVendor('vendor5@gmail.com', {
    password: 'testtest',
    companyName: 'TacoBandito',
    logo:
      'https://s3-us-west-1.amazonaws.com/dudetruck-logos/logos/default.jpg',
    description: 'Bomb Tacos',
    phone: '(916) 123-4567',
    schedule: 'Mon-Fri 1am-7am',
    lat: 38.553,
    long: -121.4265,
    vegan: false,
    vegetarian: false,
    glutenFree: true,
  });
  await createReview('user1@gmail.com', 'vendor1@gmail.com', {
    review: 'This food tastes good.',
    rating: 5,
  });

  await createReview('user1@gmail.com', 'vendor2@gmail.com', {
    review: 'This food tastes OK.',
    rating: 3,
  });
};

export default seed;
