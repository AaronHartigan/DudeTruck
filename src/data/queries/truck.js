import { GraphQLID as IDType } from 'graphql';
import VendorSettingsType from '../types/VendorSettingsType';
import VendorSettings from '../models/VendorSettings';

const truck = {
  type: VendorSettingsType,
  args: {
    id: { type: IDType },
  },
  resolve(root, args, { user }) {
    return (
      user &&
      VendorSettings.findOne({
        where: {
          id: args.id,
        },
      })
    );
  },
};

export default truck;
