import {
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
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
    lat: { type: FloatType },
    long: { type: FloatType },
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
          lat: args.lat,
          long: args.long,
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
