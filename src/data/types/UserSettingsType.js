import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLBoolean as Boolean,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const UserSettingsType = new ObjectType({
  name: 'UserSettings',
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
    type: { type: StringType },
    vegan: { type: Boolean },
    vegetarian: { type: Boolean },
    gluten_free: { type: Boolean },
  },
});

export default UserSettingsType;
