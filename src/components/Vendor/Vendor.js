import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FaPhone from 'react-icons/lib/fa/phone';
import FaCalendar from 'react-icons/lib/fa/calendar';
import Feedback from '../Feedback';
import Stars from '../Stars';
import foodOptions from '../../core/foodOptions';
import s from './Vendor.css';

class Vendor extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

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
    rating: PropTypes.shape({
      rating: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }),
    ratingId: PropTypes.string,
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
    rating: {
      rating: 0,
      count: 0,
    },
    ratingId: '',
    error: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.rating,
    };

    this.updateRating = this.updateRating.bind(this);
  }

  async updateRating() {
    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `
          query rating($id: ID!) {
            rating(id: $id) {
              rating,
              count,
            }
          }
        `,
        variables: {
          id: this.props.ratingId,
        },
      }),
    });
    const { data } = await resp.json();
    const rating = data && data.rating;

    this.setState({
      rating: {
        rating: rating.rating,
        count: rating.count,
      },
    });
  }

  render() {
    if (this.props.error) {
      return (
        <div className={s.error}>
          <h1>Error. Unable to fetch food truck data.</h1>
        </div>
      );
    }
    const dietaryOptions = foodOptions(this.props.truck) || 'None';
    const rating = this.state.rating;

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
                <span className={s.rating}>
                  {rating.count !== 0 ? rating.rating.toFixed(1) : null}
                </span>{' '}
                <Stars rating={rating.rating} /> ({rating.count})
              </div>
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
        <Feedback
          shouldUpdate={this.updateRating}
          vendorId={this.props.truck.vendorId}
        />
      </div>
    );
  }
}

export default withStyles(s)(Vendor);
