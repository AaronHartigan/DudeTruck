import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const FeedbackType = new ObjectType({
  name: 'Feedback',
  fields: {
    id: { type: new NonNull(ID) },
    review: { type: StringType },
  },
});

export default FeedbackType;
