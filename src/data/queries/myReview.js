import { GraphQLNonNull as NonNull, GraphQLID as ID } from 'graphql';
import User from '../models/User';
import UserSettings from '../models/UserSettings';
import VendorSettings from '../models/VendorSettings';
import MyReviewType from '../types/MyReviewType';
import Feedback from '../models/Feedback';
import { userTypes } from '../../constants';

const myReview = {
  type: MyReviewType,
  args: {
    id: { type: new NonNull(ID) },
  },
  async resolve(root, args, { user }) {
    let review = await Feedback.findOne({
      where: {
        revieweeId: args.id,
        reviewerId: user.id,
      },
    });

    if (!review) {
      review = {};
    }

    const reviewer = await User.findOne({
      where: {
        id: user.id,
      },
    });

    if (reviewer.type === userTypes.user) {
      const settings = await UserSettings.findOne({
        where: {
          userId: user.id,
        },
      });
      review.name = settings && settings.name;
      review.age = settings && settings.age;
    } else if (reviewer.type === userTypes.vendor) {
      const settings = await VendorSettings.findOne({
        where: {
          vendorId: user.id,
        },
      });
      review.name = settings && settings.companyName;
      review.age = null;
    }

    return review;
  },
};

export default myReview;
