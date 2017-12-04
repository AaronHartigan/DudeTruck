import {
  GraphQLObjectType as ObjectType,
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
} from 'graphql';

const RatingType = new ObjectType({
  name: 'Rating',
  fields: {
    rating: { type: FloatType },
    count: { type: IntType },
  },
});

export default RatingType;
