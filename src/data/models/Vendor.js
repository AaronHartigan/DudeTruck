import bcrypt from 'bcrypt';
import DataType from 'sequelize';
import Model from '../sequelize';
import { userTypes } from '../../constants';
import { SALT_ROUNDS } from '../../config';

const Vendor = Model.define('Vendor', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
    unique: true,
  },

  type: {
    type: DataType.STRING(16),
    defaultValue: userTypes.vendor,
  },

  password: {
    type: DataType.STRING,
    allowNull: false,
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

  gluten_free: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
});

Vendor.prototype.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

function lowerEmail(instance) {
  return instance.set('email', instance.email.toLowerCase());
}

function hashPassword(instance, done) {
  if (!instance.changed('password')) {
    return done();
  }
  return bcrypt
    .hash(instance.password, SALT_ROUNDS)
    .then(hash => instance.set('password', hash));
}

Vendor.beforeCreate(hashPassword);
Vendor.beforeUpdate(hashPassword);
Vendor.beforeCreate(lowerEmail);

export default Vendor;
