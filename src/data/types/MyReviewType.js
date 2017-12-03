import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
} from 'graphql';

const MyReviewType = new ObjectType({
  name: 'MyReview',
  fields: {
    review: { type: StringType },
    rating: { type: IntType },
    name: { type: StringType },
    age: { type: IntType },
  },
});

export default MyReviewType;
