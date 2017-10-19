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
});

export default Vendor;
