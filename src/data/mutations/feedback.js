import {
  GraphQLNonNull as NonNull,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';
import User from '../models/User';
import UserSettings from '../models/UserSettings';
import VendorSettings from '../models/VendorSettings';
import FeedbackType from '../types/FeedbackType';
import Feedback from '../models/Feedback';
import { userTypes } from '../../constants';

const feedback = {
  type: FeedbackType,
  args: {
    revieweeId: { type: new NonNull(ID) },
    review: { type: StringType },
    rating: { type: IntType },
  },
  async resolve(root, args, { user }) {
    if (!user) {
      return null;
    }
    await Feedback.upsert(
      {
        reviewerId: user.id,
        revieweeId: args.revieweeId,
        review: args.review,
        rating: args.rating,
      },
      {
        where: {
          reviewerId: user.id,
          revieweeId: args.revieweeId,
        },
      },
    );

    const review = await Feedback.findOne({
      where: {
        reviewerId: user.id,
        revieweeId: args.revieweeId,
      },
    });

    const reviewer = await User.findOne({
      where: {
        id: user.id,
      },
    });

    if (!reviewer) {
      return null;
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

    return review;
  },
};

export default feedback;
