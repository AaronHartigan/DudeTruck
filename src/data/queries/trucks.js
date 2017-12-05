import { GraphQLList as List } from 'graphql';
import Sequelize from 'sequelize';
import VendorSettingsType from '../types/VendorSettingsType';
import VendorSettings from '../models/VendorSettings';
import User from '../models/User';
import UserSettings from '../models/UserSettings';
import { userTypes } from '../../constants';

const trucks = {
  type: new List(VendorSettingsType),
  async resolve(root, args, { user }) {
    const Op = Sequelize.Op;
    try {
      const userObj = await User.findOne({
        where: {
          id: user.id,
        },
      });

      const foodOptions = {
        vegan: false,
        vegetarian: false,
        glutenFree: false,
      };

      if (userObj.type === userTypes.user) {
        const settings = await UserSettings.findOne({
          where: {
            userId: userObj.id,
          },
        });
        foodOptions.vegan = settings.vegan;
        foodOptions.vegetarian = settings.vegetarian;
        foodOptions.glutenFree = settings.glutenFree;
      }

      const whereStatementAndClause = [];
      if (foodOptions.vegan) {
        whereStatementAndClause.push({ vegan: true });
      }
      if (foodOptions.vegetarian) {
        whereStatementAndClause.push({ vegetarian: true });
      }
      if (foodOptions.glutenFree) {
        whereStatementAndClause.push({ glutenFree: true });
      }

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
            companyName: {
              [Op.ne]: '',
            },
            phone: {
              [Op.ne]: '',
            },
            description: {
              [Op.ne]: '',
            },
            schedule: {
              [Op.ne]: '',
            },
            [Op.and]: whereStatementAndClause,
          },
          limit: 100,
        })
      );
    } catch (error) {
      return null;
    }
  },
};

export default trucks;
