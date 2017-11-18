import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import GoogleMapReact from 'google-map-react';
import Link from '../Link';
import Marker from '../Marker';
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

class Search extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      lat: 0,
      long: 0,
      trucks: [],
    };

    this.handleCoords = this.handleCoords.bind(this);
    this.getGPS = this.getGPS.bind(this);
    this.setTrucks = this.setTrucks.bind(this);
  }

  async componentDidMount() {
    this.getGPS();
    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `{
          trucks {
            id,companyName,phone,schedule,lat,long,vegan,vegetarian,glutenFree
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

  getGPS() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handleCoords);
    }
  }

  handleCoords(pos) {
    this.setState({
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    });
  }

  render() {
    const GoogleMapsConfig = {
      key: 'AIzaSyBITkFzK9gnYvlgnXe0pH1ixHACInErAVI',
    };
    const location = { lat: this.state.lat, lng: this.state.long };
    const markers = this.state.trucks.map(truck => (
      <Marker key={truck.id} lat={truck.lat} lng={truck.long} />
    ));
    const links = this.state.trucks.map(truck => {
      const options = getFoodOptions(truck);
      return (
        <Link key={truck.id} className={s.link} to={`/vendor/${truck.id}`}>
          <div className={s.vendorLinkContainer}>
            <div className={s.vendorTitle}>{truck.companyName}</div>
            <div className={s.vendorInfo}>{truck.phone}</div>
            <div className={s.vendorInfo}>{truck.schedule}</div>
            <div className={s.vendorInfo}>{options}</div>
          </div>
        </Link>
      );
    });

    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.state.lat && this.state.long ? (
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

export default withStyles(s)(Search);
