import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker';
import s from './Search.css';

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
        query: '{trucks{id, lat, long}}',
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
    const trucks = this.state.trucks.map(truck => (
      <Marker key={truck.id} lat={truck.lat} lng={truck.long} />
    ));

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>
            lat: {this.state.lat}, long:{this.state.long}
          </h1>
          {this.state.lat && this.state.long ? (
            <div className={s.mapBox}>
              <GoogleMapReact
                bootstrapURLKeys={GoogleMapsConfig}
                center={location}
                defaultZoom={15}
              >
                {trucks}
              </GoogleMapReact>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Search);
