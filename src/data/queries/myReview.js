import { GraphQLNonNull as NonNull, GraphQLID as ID } from 'graphql';
import MyReviewType from '../types/MyReviewType';
import Feedback from '../models/Feedback';

const myReview = {
  type: MyReviewType,
  args: {
    id: { type: new NonNull(ID) },
  },
  async resolve(root, args, { user }) {
    return Feedback.findOne({
      where: {
        revieweeId: args.id,
        reviewerId: user.id,
      },
    });
  },
};

export default myReview;
