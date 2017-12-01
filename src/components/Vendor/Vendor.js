import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FaPhone from 'react-icons/lib/fa/phone';
import FaCalendar from 'react-icons/lib/fa/calendar';
import Feedback from '../Feedback';
import foodOptions from '../../core/foodOptions';
import s from './Vendor.css';

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
    const dietaryOptions = foodOptions(this.props.truck) || 'None';

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.header}>
            <div className={s.imageContainer}>
              <img className={s.image} src={this.props.truck.logo} alt="" />
            </div>
            <div className={s.title}>
              <h1>{this.props.truck.companyName}</h1>
              <div>
                <FaPhone /> {this.props.truck.phone}
              </div>
              <div>
                <FaCalendar /> {this.props.truck.schedule}
              </div>
            </div>
            <div className={s.clear} />
          </div>
          <div className={s.fieldContainer}>
            <div className={s.bold}>Description:</div>
            <div>{this.props.truck.description}</div>
          </div>
          <div className={s.fieldContainer}>
            <div className={s.bold}>Special Dietary Options:</div>
            <div>{dietaryOptions}</div>
          </div>
        </div>
        <Feedback vendorId={this.props.truck.vendorId} />
      </div>
    );
  }
}

export default withStyles(s)(Vendor);
