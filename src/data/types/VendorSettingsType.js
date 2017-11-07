import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLBoolean as BooleanType,
  GraphQLString as StringType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const VendorSettingsType = new ObjectType({
  name: 'VendorSettings',
  fields: {
    id: { type: new NonNull(ID) },
    logo: { type: StringType },
    companyName: { type: StringType },
    phone: { type: StringType },
    schedule: { type: StringType },
    lat: { type: FloatType },
    long: { type: FloatType },
    vegan: { type: BooleanType },
    vegetarian: { type: BooleanType },
    glutenFree: { type: BooleanType },
  },
});

export default VendorSettingsType;
