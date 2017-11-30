import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Feedback from '../Feedback';
import s from './Vendor.css';

const boolToEnglish = function boolToEnglish(hasFood) {
  return hasFood ? 'Yes' : 'No';
};

class Vendor extends React.Component {
  static propTypes = {
    truck: PropTypes.shape({
      logo: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      schedule: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      vegan: PropTypes.bool.isRequired,
      vegetarian: PropTypes.bool.isRequired,
      glutenFree: PropTypes.bool.isRequired,
      vendorId: PropTypes.string.isRequired,
    }),
    error: PropTypes.bool,
  };

  static defaultProps = {
    truck: {
      logo: '',
      companyName: '',
      description: '',
      phone: '',
      schedule: '',
      lat: 0,
      long: 0,
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      vendorId: '',
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
          <img src={this.props.truck.logo} alt="" />
          <h1>{this.props.truck.companyName}</h1>
          <div>{this.props.truck.description}</div>
          <div>Phone: {this.props.truck.phone}</div>
          <div>Schedule: {this.props.truck.schedule}</div>
          <div>Vegan: {boolToEnglish(this.props.truck.vegan)}</div>
          <div>Vegetarian: {boolToEnglish(this.props.truck.vegetarian)}</div>
          <div>Gluten Free: {boolToEnglish(this.props.truck.glutenFree)}</div>
        </div>
        <Feedback vendorId={this.props.truck.vendorId} />
      </div>
    );
  }
}

export default withStyles(s)(Vendor);
