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
    defaultValue:
      'https://s3-us-west-1.amazonaws.com/dudetruck-logos/logos/default.jpg',
  },

  companyName: {
    type: DataType.STRING(50),
    defaultValue: '',
  },

  description: {
    type: DataType.TEXT(),
    defaultValue: '',
  },

  phone: {
    type: DataType.STRING(12),
    defaultValue: '',
  },

  schedule: {
    type: DataType.STRING(255),
    defaultValue: '',
  },

  lat: {
    type: DataType.FLOAT,
    defaultValue: 0,
  },

  long: {
    type: DataType.FLOAT,
    defaultValue: 0,
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
