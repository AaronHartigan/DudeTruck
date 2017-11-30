import {
  GraphQLNonNull as NonNull,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';
import FeedbackType from '../types/FeedbackType';
import Feedback from '../models/Feedback';

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

    return Feedback.findOne({
      where: {
        reviewerId: user.id,
        revieweeId: args.revieweeId,
      },
    });
  },
};

export default feedback;
