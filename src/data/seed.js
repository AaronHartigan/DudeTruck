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

  await createUser('user2@gmail.com', {
    password: 'testtest',
    name: 'Joe Smith',
    age: 25,
    vegan: true,
    vegetarian: false,
    glutenFree: true,
  });

  await createUser('user3@gmail.com', {
    password: 'testtest',
    name: 'Bob Saget',
    age: 65,
    vegan: false,
    vegetarian: false,
    glutenFree: false,
  });

  await createUser('user4@gmail.com', {
    password: 'testtest',
    name: 'Robert E. Lee',
    age: 90,
    vegan: false,
    vegetarian: false,
    glutenFree: true,
  });

  await createUser('user5@gmail.com', {
    password: 'testtest',
    name: 'Cookie Monster',
    age: 50,
    vegan: false,
    vegetarian: true,
    glutenFree: false,
  });

  await createUser('user6@gmail.com', {
    password: 'testtest',
    name: 'Mike James',
    age: 18,
    vegan: true,
    vegetarian: true,
    glutenFree: false,
  });

  await createUser('user7@gmail.com', {
    password: 'testtest',
    name: 'Joe Jones',
    age: 20,
    vegan: false,
    vegetarian: true,
    glutenFree: false,
  });

  await createUser('user8@gmail.com', {
    password: 'testtest',
    name: 'Joseph Michael',
    age: 30,
    vegan: false,
    vegetarian: true,
    glutenFree: true,
  });

  await createUser('user9@gmail.com', {
    password: 'testtest',
    name: 'Michael Jackson',
    age: 52,
    vegan: true,
    vegetarian: true,
    glutenFree: true,
  });

  await createUser('user10@gmail.com', {
    password: 'testtest',
    name: 'Lil Bill',
    age: 10,
    vegan: true,
    vegetarian: true,
    glutenFree: false,
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

  await createReview('user2@gmail.com', 'vendor1@gmail.com', {
    review: 'Small food portions and overpriced.',
    rating: 2,
  });

  await createReview('user3@gmail.com', 'vendor2@gmail.com', {
    review: 'My food was cold!!!',
    rating: 1,
  });

  await createReview('user4@gmail.com', 'vendor2@gmail.com', {
    review: 'Excellent food and friendly service!',
    rating: 5,
  });

  await createReview('user5@gmail.com', 'vendor3@gmail.com', {
    review: 'Bad customer service, but food was delicious!',
    rating: 3,
  });

  await createReview('user6@gmail.com', 'vendor3@gmail.com', {
    review: 'Although the wait was long, the food was very good.',
    rating: 4,
  });

  await createReview('user7@gmail.com', 'vendor4@gmail.com', {
    review:
      'I could have stayed home and made myself better food. Not satisfied at all! But it was convenient.',
    rating: 2,
  });

  await createReview('user8@gmail.com', 'vendor4@gmail.com', {
    review:
      'This is my favorite food truck! The food was marvelous and the service was excellent!! I would give a million rating if I could!!!',
    rating: 5,
  });

  await createReview('user9@gmail.com', 'vendor5@gmail.com', {
    review:
      'Is it possible to give a 0 rating?!?! This food truck is not friendly and the food is overpriced for such small portions. Also not very tasty!',
    rating: 1,
  });

  await createReview('user10@gmail.com', 'vendor5@gmail.com', {
    review:
      'The best thing about this food truck is that its convenient to locate, thanks to DudeTruck!',
    rating: 3,
  });

  await createReview('user10@gmail.com', 'vendor9@gmail.com', {
    review: 'Place offers gluten free food and it tastes really good.',
    rating: 5,
  });

  await createReview('user8@gmail.com', 'vendor1@gmail.com', {
    review: 'A food truck that serves Vegan, but does not suit my taste.',
    rating: 2,
  });

  await createReview('user3@gmail.com', 'vendor7@gmail.com', {
    review: "Vegetarian food truck that's rare and now I know why.",
    rating: 1,
  });

  await createReview('user6@gmail.com', 'vendor8@gmail.com', {
    review: 'Gluten-free truck and the food was very good.',
    rating: 4,
  });

  await createReview('user2@gmail.com', 'vendor4@gmail.com', {
    review: 'Vegatarian food truck, yeah...not so much. Horrible food.',
    rating: 2,
  });

  await createReview('user9@gmail.com', 'vendor6@gmail.com', {
    review:
      "Great food truck who offers not to cook using ingredients that I'm allergic too.",
    rating: 5,
  });

  await createReview('user1@gmail.com', 'vendor5@gmail.com', {
    review:
      'DudeTruck listed this vegan food truck and they cater to customers with allergies!',
    rating: 4,
  });
};

export default seed;
