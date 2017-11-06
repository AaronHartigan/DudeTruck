import {
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
} from 'graphql';
import VendorSettingsType from '../types/VendorSettingsType';
import VendorSettings from '../models/VendorSettings';

const updateVendorSettings = {
  type: VendorSettingsType,
  args: {
    logo: { type: StringType },
    companyName: { type: StringType },
    phone: { type: StringType },
    schedule: { type: StringType },
    location: { type: StringType },
    vegetarian: { type: BooleanType },
    vegan: { type: BooleanType },
    glutenFree: { type: BooleanType },
  },
  resolve(root, args, { user }) {
    return (
      user &&
      VendorSettings.update(
        {
          logo: args.logo,
          companyName: args.companyName,
          phone: args.phone,
          schedule: args.schedule,
          location: args.location,
          vegetarian: args.vegetarian,
          vegan: args.vegan,
          glutenFree: args.glutenFree,
        },
        {
          where: { vendorId: user.id },
        },
      )
    );
  },
};

export default updateVendorSettings;
