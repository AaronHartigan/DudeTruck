import DataType from 'sequelize';
import Model from '../sequelize';

const Feedback = Model.define('Feedback', {
  userID: {
    type: DataType.Integer,
    foreignKey: true,
  },

  vendorID: {
    type: DataType.INTEGER,
    foreignKey: true,
  },

  stars5Count: {
    type: DataType.INTEGER,
  },

  stars4Count: {
    type: DataType.INTEGER,
  },

  stars3Count: {
    type: DataType.INTEGER,
  },

  stars2Count: {
    type: DataType.INTEGER,
  },

  stars1Count: {
    type: DataType.INTEGER,
  },

  review: {
    type: DataType.STRING(255),
  },
});

export default Feedback;
