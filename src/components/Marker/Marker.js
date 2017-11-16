import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Marker.css';

class Marker extends React.Component {
  render() {
    return <div className={s.marker} />;
  }
}

export default withStyles(s)(Marker);
