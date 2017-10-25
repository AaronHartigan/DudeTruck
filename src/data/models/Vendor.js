import DataType from 'sequelize';
import Model from '../sequelize';

const Vendor = Model.define('Vendor', {
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
    type: DataType.Boolean,
    defaultValue: false,
  },

  vegetarian: {
    type: DataType.Boolean,
    defaultValue: false,
  },

  gluten_free: {
    type: DataType.Boolean,
    defaultValue: false,
  },
});

export default Vendor;
