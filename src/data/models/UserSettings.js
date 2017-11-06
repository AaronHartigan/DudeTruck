import DataType from 'sequelize';
import Model from '../sequelize';

const UserSettings = Model.define('UserSettings', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  name: {
    type: DataType.STRING(255),
    defaultValue: '',
  },

  age: {
    type: DataType.INTEGER,
    allowNull: true,
  },

  vegan: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

  vegetarian: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

  glutenFree: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
});

export default UserSettings;
