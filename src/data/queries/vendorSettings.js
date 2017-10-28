import VendorSettingsType from '../types/VendorSettingsType';
import Vendor from '../models/Vendor';

const vendorSettings = {
  type: VendorSettingsType,
  resolve(root, args, { user }) {
    return (
      user &&
      Vendor.find({
        where: {
          id: user.id,
        },
      })
    );
  },
};

export default vendorSettings;
