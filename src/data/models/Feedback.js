import DataType from 'sequelize';
import Model from '../sequelize';

const Feedback = Model.define(
  'Feedback',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
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
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['vendorID', 'userID'],
      },
    ],
  },
);

export default Feedback;
