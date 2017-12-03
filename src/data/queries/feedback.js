import {
  GraphQLNonNull as NonNull,
  GraphQLID as ID,
  GraphQLList as List,
} from 'graphql';
import User from '../models/User';
import UserSettings from '../models/UserSettings';
import VendorSettings from '../models/VendorSettings';
import FeedbackType from '../types/FeedbackType';
import Feedback from '../models/Feedback';
import { userTypes } from '../../constants';

/* eslint-disable no-param-reassign */

// Mutates the reviews to include the reviewer age and name
async function mutateReviews(review) {
  const reviewer = await User.findOne({
    where: {
      id: review.reviewerId,
    },
  });
  if (!reviewer) {
    return;
  }

  if (reviewer.type === userTypes.user) {
    const settings = await UserSettings.findOne({
      where: {
        userId: review.reviewerId,
      },
    });
    review.name = settings && settings.name;
    review.age = settings && settings.age;
  } else if (reviewer.type === userTypes.vendor) {
    const settings = await VendorSettings.findOne({
      where: {
        vendorId: review.reviewerId,
      },
    });
    review.name = settings && settings.companyName;
    review.age = null;
  }
}

const feedback = {
  type: new List(FeedbackType),
  args: {
    id: { type: new NonNull(ID) },
  },
  async resolve(root, args, { user }) {
    if (!user) {
      return null;
    }

    try {
      const reviews = await Feedback.findAll({
        where: {
          revieweeId: args.id,
        },
        order: [['updatedAt', 'DESC']],
      });

      await Promise.all(reviews.map(mutateReviews));

      return reviews;
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return null;
    }
  },
};

export default feedback;
