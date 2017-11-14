import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import GoogleMapReact from 'google-map-react';
import s from './Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      lat: 0,
      long: 0,
    };

    this.handleCoords = this.handleCoords.bind(this);
    this.getGPS = this.getGPS.bind(this);
  }

  componentDidMount() {
    this.getGPS();
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
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Search);
