import bcrypt from 'bcrypt';
import DataType from 'sequelize';
import Model from '../sequelize';
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

    password: {
      type: DataType.STRING,
      allowNull: false,
    },

    type: {
      type: DataType.STRING(255),
      defaultValue: userTypes.user,
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

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeCreate(lowerEmail);

export default User;
