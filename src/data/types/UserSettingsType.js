import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const UserSettingsType = new ObjectType({
  name: 'UserSettings',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    age: { type: IntType },
    vegan: { type: BooleanType },
    vegetarian: { type: BooleanType },
    glutenFree: { type: BooleanType },
  },
});

export default UserSettingsType;
