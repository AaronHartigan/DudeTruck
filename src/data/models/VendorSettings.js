import DataType from 'sequelize';
import Model from '../sequelize';

const VendorSettings = Model.define('VendorSettings', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  logo: {
    type: DataType.STRING(255),
  },

  companyName: {
    type: DataType.STRING(50),
  },

  phone: {
    type: DataType.STRING(12),
  },

  schedule: {
    type: DataType.STRING(255),
  },

  location: {
    type: DataType.STRING(12),
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

export default VendorSettings;
