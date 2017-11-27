import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const LogoType = new ObjectType({
  name: 'Logo',
  fields: {
    logo: { type: StringType },
  },
});

export default LogoType;
