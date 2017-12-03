import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

const FeedbackType = new ObjectType({
  name: 'Feedback',
  fields: {
    id: { type: new NonNull(ID) },
    review: { type: StringType },
    rating: { type: IntType },
    name: { type: StringType },
    age: { type: IntType },
    updatedAt: { type: StringType },
  },
});

export default FeedbackType;
