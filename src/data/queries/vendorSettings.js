import VendorSettingsType from '../types/VendorSettingsType';
import VendorSettings from '../models/VendorSettings';

const settings = {
  type: VendorSettingsType,
  resolve(root, args, { user }) {
    return (
      user &&
      VendorSettings.findOne({
        where: {
          vendorId: user.id,
        },
      })
    );
  },
};

export default settings;
