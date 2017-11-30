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

    rating: {
      type: DataType.TINYINT,
      defaultValue: null,
    },

    review: {
      type: DataType.STRING(255),
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['reviewerId', 'revieweeId'],
      },
    ],
  },
);

export default Feedback;
