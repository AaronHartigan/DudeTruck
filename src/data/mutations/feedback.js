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
    reviewerId: { type: new NonNull(ID) },
    revieweeId: { type: new NonNull(ID) },
    review: { type: StringType },
    rating: { type: IntType },
  },
  resolve(root, args, { user }) {
    return (
      user &&
      Feedback.upsert(
        {
          reviewerId: args.reviewerId,
          revieweeId: args.revieweeId,
          review: args.review,
          // rating: args.rating,
        },
        {
          where: {
            reviewerId: args.reviewerId,
            revieweeId: args.revieweeId,
          },
        },
      )
    );
  },
};

export default feedback;
