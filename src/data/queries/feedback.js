import {
  GraphQLNonNull as NonNull,
  GraphQLID as ID,
  GraphQLList as List,
} from 'graphql';
import FeedbackType from '../types/FeedbackType';
import Feedback from '../models/Feedback';

const feedback = {
  type: new List(FeedbackType),
  args: {
    id: { type: new NonNull(ID) },
  },
  async resolve(root, args, { user }) {
    return (
      user &&
      Feedback.findAll({
        where: {
          revieweeId: args.id,
        },
        order: [['updatedAt', 'DESC']],
      })
    );
  },
};

export default feedback;
