import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLBoolean as Boolean,
  GraphQLString as StringType,
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
    location: { type: StringType },
    vegan: { type: Boolean },
    vegetarian: { type: Boolean },
    gluten_free: { type: Boolean },
  },
});

export default VendorSettingsType;
