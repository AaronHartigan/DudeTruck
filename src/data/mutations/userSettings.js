import {
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
} from 'graphql';
import UserSettingsType from '../types/UserSettingsType';
import UserSettings from '../models/UserSettings';

const updateUserSettings = {
  type: UserSettingsType,
  args: {
    name: { type: StringType },
    age: { type: IntType },
    vegetarian: { type: BooleanType },
    vegan: { type: BooleanType },
    glutenFree: { type: BooleanType },
  },
  resolve(root, args, { user }) {
    return (
      user &&
      UserSettings.update(
        {
          name: args.name,
          age: args.age,
          vegetarian: args.vegetarian,
          vegan: args.vegan,
          glutenFree: args.glutenFree,
        },
        {
          where: { userId: user.id },
        },
      )
    );
  },
};

export default updateUserSettings;
