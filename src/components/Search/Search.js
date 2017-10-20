import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>
            lat: {this.state.lat}, long:{this.state.long}
          </h1>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Search);
