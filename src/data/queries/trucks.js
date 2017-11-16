import { GraphQLList as List } from 'graphql';
import Sequelize from 'sequelize';
import VendorSettingsType from '../types/VendorSettingsType';
import VendorSettings from '../models/VendorSettings';

const trucks = {
  type: new List(VendorSettingsType),
  resolve(root, args, { user }) {
    const Op = Sequelize.Op;
    return (
      user &&
      VendorSettings.findAll({
        where: {
          lat: {
            [Op.ne]: 0,
          },
          long: {
            [Op.ne]: 0,
          },
        },
        limit: 100,
      })
    );
  },
};

export default trucks;
