import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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
    }),
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        rating: PropTypes.number,
        reviewerName: PropTypes.string,
        reviewerAge: PropTypes.number,
      }),
    ),
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
    },
    reviews: [],
    error: true,
  };

  constructor() {
    super();

    this.state = {
      review: '',
      rating: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    // this will change (just to get eslint off my back)
    this.setState({
      rating: null,
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

    const reviews = this.props.reviews.map(review => <div>{review.text}</div>);
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
          <form onSubmit={this.handleSubmit}>
            <div className={s.form}>
              <label htmlFor="review">
                <textarea
                  className={s.formControlTextArea}
                  type="text"
                  name="review"
                  id="review"
                  placeholder="Leave a review..."
                  value={this.state.review}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <input className={s.button} type="submit" value="Submit" />
          </form>
          <div>{reviews}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Vendor);
