import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Marker.css';

class Marker extends React.Component {
  static propTypes = {
    text: PropTypes.number.isRequired,
  };

  render() {
    return (
      <div className={s.border}>
        <div className={s.marker}>
          <div className={s.text}>{this.props.text}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Marker);
