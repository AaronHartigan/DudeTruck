import bcrypt from 'bcrypt';
import DataType from 'sequelize';
import Model from '../sequelize';
import UserSettings from './UserSettings';
import VendorSettings from './VendorSettings';
import { userTypes } from '../../constants';
import { SALT_ROUNDS } from '../../config';

const User = Model.define(
  'User',
  {
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
      defaultValue: userTypes.user,
    },

    password: {
      type: DataType.STRING,
      allowNull: false,
    },
  },

  {
    indexes: [{ fields: ['email'] }],
  },
);

User.prototype.validPassword = function validPassword(password) {
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

function createSettings(instance) {
  if (instance.type === userTypes.user)
    return UserSettings.create({
      userId: instance.id,
    });
  else if (instance.type === userTypes.vendor) {
    return VendorSettings.create({
      vendorId: instance.id,
    });
  }
  return null;
}

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeCreate(lowerEmail);
User.afterCreate(createSettings);

export default User;
