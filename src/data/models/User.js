import bcrypt from 'bcrypt';
import DataType from 'sequelize';
import Model from '../sequelize';
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
      defaultValue: 'user',
    },
  },
  {
    indexes: [{ fields: ['email'] }],
  },
);

User.prototype.validPassword = password =>
  bcrypt.compare(password, this.password);

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
