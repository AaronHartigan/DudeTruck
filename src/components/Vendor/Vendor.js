import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Vendor.css';

const hasFoodInEnglish = function hasFoodInEnglish(hasFood) {
  return hasFood ? 'Yes' : 'No';
};

class Vendor extends React.Component {
  static propTypes = {
    truck: PropTypes.shape({
      logo: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      schedule: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      vegan: PropTypes.bool.isRequired,
      vegetarian: PropTypes.bool.isRequired,
      glutenFree: PropTypes.bool.isRequired,
    }),
    error: PropTypes.bool,
  };

  static defaultProps = {
    truck: {
      logo: '',
      companyName: '',
      phone: '',
      schedule: '',
      lat: 0,
      long: 0,
      vegan: false,
      vegetarian: false,
      glutenFree: false,
    },
    error: true,
  };

  render() {
    if (this.props.error) {
      return (
        <div className={s.error}>
          <h1>Error. Unable to fetch food truck data.</h1>
        </div>
      );
    }
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div>Name: {this.props.truck.companyName}</div>
          <div>Phone: {this.props.truck.phone}</div>
          <div>Schedule: {this.props.truck.schedule}</div>
          <div>Vegan: {hasFoodInEnglish(this.props.truck.vegan)}</div>
          <div>Vegetarian: {hasFoodInEnglish(this.props.truck.vegetarian)}</div>
          <div>
            Gluten Free: {this.hasFoodInEnglish(this.props.truck.glutenFree)}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Vendor);
