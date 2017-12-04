import { GraphQLNonNull as NonNull, GraphQLID as ID } from 'graphql';
import RatingType from '../types/RatingType';
import Feedback from '../models/Feedback';
import VendorSettings from '../models/VendorSettings';

const rating = {
  type: RatingType,
  args: {
    id: { type: new NonNull(ID) },
  },
  async resolve(root, args, { user }) {
    if (!user) {
      return null;
    }

    const vendor = await VendorSettings.findOne({
      where: {
        id: args.id,
      },
    });

    if (!vendor) {
      return null;
    }

    const reviews = await Feedback.findAll({
      where: {
        revieweeId: vendor.vendorId,
      },
    });

    let totalRating = 0;
    for (let i = 0; i < reviews.length; i += 1) {
      totalRating += reviews[i].rating;
    }

    let stars = totalRating / reviews.length;
    if (isNaN(stars)) {
      stars = 0;
    }

    return {
      rating: stars,
      count: reviews.length || 0,
    };
  },
};

export default rating;
