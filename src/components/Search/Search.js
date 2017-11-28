import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import GoogleMapReact from 'google-map-react';
import Link from '../Link';
import Marker from '../Marker';
import Spinner from '../Spinner';
import s from './Search.css';

const getFoodOptions = function getFoodOptions(truck) {
  let options = '';
  if (truck.vegan) {
    options += 'Vegan';
  }
  if (truck.vegetarian) {
    if (options.length > 0) {
      options += ' · ';
    }
    options += 'Vegetarian';
  }
  if (truck.glutenFree) {
    if (options.length > 0) {
      options += ' · ';
    }
    options += 'Gluten Free';
  }

  return options;
};

const getGPS = function getGPS() {
  return new Promise((resolve, reject) => {
    if (navigator && navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(resolve, reject);
    }
    return null;
  });
};

const DEFAULT_LOCATION = {
  // Sac State
  lat: 38.5617845,
  long: -121.4274376,
};

class Search extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isLoading: true,
      lat: null,
      long: null,
      trucks: [],
    };

    this.handleCoords = this.handleCoords.bind(this);
    this.setTrucks = this.setTrucks.bind(this);
  }

  async componentDidMount() {
    let pos = {};
    try {
      pos = await getGPS();
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
    }
    this.handleCoords(pos && pos.coords);

    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `{
          trucks {
            id,logo,companyName,phone,schedule,lat,long,vegan,vegetarian,glutenFree
          }
        }`,
      }),
    });

    const { data } = await resp.json();
    if (!data || !data.trucks) {
      throw new Error('Unable to fetch truck locations');
    }

    this.setTrucks(data.trucks);
  }

  setTrucks(trucks) {
    this.setState({
      trucks,
    });
  }

  handleCoords(coords = {}) {
    const newCoords = {};
    if (
      typeof coords.latitude !== 'number' ||
      typeof coords.longitude !== 'number'
    ) {
      newCoords.lat = DEFAULT_LOCATION.lat;
      newCoords.long = DEFAULT_LOCATION.long;
    } else {
      newCoords.lat = coords.latitude;
      newCoords.long = coords.longitude;
    }

    this.setState({
      isLoading: false,
      ...newCoords,
    });
  }

  render() {
    const GoogleMapsConfig = {
      key: 'AIzaSyBITkFzK9gnYvlgnXe0pH1ixHACInErAVI',
    };
    const location = { lat: this.state.lat, lng: this.state.long };
    const markers = this.state.trucks.map((truck, idx) => (
      <Marker key={truck.id} text={idx} lat={truck.lat} lng={truck.long} />
    ));
    const links = this.state.trucks.map((truck, idx) => {
      const options = getFoodOptions(truck);
      return (
        <Link key={truck.id} className={s.link} to={`/vendor/${truck.id}`}>
          <div className={s.vendorLinkContainer}>
            <div className={s.imageContainer}>
              <img className={s.image} src={truck.logo} alt="" />
            </div>
            <div
              className={s.vendorTitle}
            >{`${truck.companyName} (${idx})`}</div>
            <div className={s.vendorInfo}>{truck.phone}</div>
            <div className={s.vendorInfo}>{truck.schedule}</div>
            <div className={s.vendorInfo}>{options}</div>
          </div>
        </Link>
      );
    });
    const isClientSide =
      typeof this.state.lat === 'number' && typeof this.state.long === 'number';

    if (this.state.isLoading) {
      return <Spinner />;
    }
    return (
      <div className={s.root}>
        <div className={s.container}>
          {isClientSide ? (
            <div className={s.mapBox}>
              <GoogleMapReact
                bootstrapURLKeys={GoogleMapsConfig}
                center={location}
                defaultZoom={15}
              >
                {markers}
              </GoogleMapReact>
            </div>
          ) : null}
          {links}
        </div>
      </div>
    );
  }
}

export { Search }; // for tests
export default withStyles(s)(Search);
