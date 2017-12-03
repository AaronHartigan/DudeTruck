import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Feedback.css';
import Spinner from '../Spinner';

class Feedback extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  static propTypes = {
    vendorId: PropTypes.string.isRequired,
  };

  constructor() {
    super();

    this.state = {
      reviews: [],
      review: '',
      isRating: false,
      highlightRating: '',
      rating: '',
      name: '\u00A0',
      age: '',
      hasReview: false,
      isLoading: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setReviews = this.setReviews.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
    this.getStars = this.getStars.bind(this);
    this.onRate = this.onRate.bind(this);
    this.willRate = this.willRate.bind(this);
    this.onCancelRate = this.onCancelRate.bind(this);
  }

  async componentDidMount() {
    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `
          query feedbackList($id: ID!) {
            feedbackList(id: $id) {
              id
              review
              rating
              name
              age
              updatedAt
            }
            myReview(id: $id){
              review
              rating
              name
              age
            }
          }
        `,
        variables: {
          id: this.props.vendorId,
        },
      }),
    });
    const { data } = await resp.json();

    this.setReviews(data);
  }

  onRate(rating, event) {
    event.preventDefault();
    this.setState({
      isRating: false,
      rating,
    });
  }

  onCancelRate(event) {
    event.preventDefault();
    this.setState({
      isRating: false,
    });
  }

  getStars(rating, interactive) {
    const stars = [1, 2, 3, 4, 5].map(num => {
      const interactiveClass = interactive ? s.interactive : null;
      const activeClass = rating >= num ? s.active : s.faded;
      const classNames = cx(interactiveClass, activeClass);
      return (
        <span
          key={num}
          role="presentation"
          className={classNames}
          onClick={interactive ? this.onRate.bind(this, num) : null}
          onMouseEnter={interactive ? this.willRate.bind(this, num) : null}
        >
          ★
        </span>
      );
    });
    return (
      <span
        className={s.star}
        onMouseLeave={interactive ? this.onCancelRate : null}
      >
        {stars}
      </span>
    );
  }

  setReviews(data = {}) {
    const reviews = data.feedbackList || [];
    const myReview = data.myReview;

    let review = '';
    let rating = '';
    let name = '';
    let age = '';
    let hasReview = false;
    if (myReview) {
      review = myReview.review;
      rating = myReview.rating;
      name = myReview.name;
      age = myReview.age;
      hasReview = true;
    }

    this.setState({
      reviews,
      review,
      rating,
      name,
      age,
      isLoading: false,
      hasReview,
    });
  }

  willRate(rating, event) {
    event.preventDefault();
    this.setState({
      isRating: true,
      highlightRating: rating,
    });
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

    if (
      isNaN(Number.parseInt(this.state.rating, 10)) ||
      this.state.rating < 1 ||
      this.state.rating > 5
    ) {
      return;
    }
    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation feedback($revieweeId: ID!, $review: String, $rating: Int) {
            feedback(revieweeId: $revieweeId, review: $review, rating: $rating) {
              id
              review
              rating
              name
              age
              updatedAt
            }
          }
        `,
        variables: {
          revieweeId: this.props.vendorId,
          review: this.state.review,
          rating: Number.parseInt(this.state.rating, 10) || '',
        },
      }),
    });
    const { data } = await resp.json();
    this.updateReviews(data && data.feedback);
  }

  updateReviews(review = {}) {
    const reviews = this.state.reviews || [];
    const idx = reviews.findIndex(e => e && e.id === review.id);
    if (idx === -1) {
      // if user did not already have a review,
      // add user's review to beginning of array
      reviews.unshift(review);
    } else {
      // else update review
      reviews[idx].rating = review.rating;
      reviews[idx].review = review.review;
      reviews[idx].name = review.name;
      reviews[idx].age = review.age;
      reviews[idx].updatedAt = review.updatedAt;
    }

    reviews.sort((a, b) => a.updatedAt < b.updatedAt);

    this.setState({
      reviews,
      rating: review.rating,
      hasReview: true,
    });
  }

  render() {
    let reviews = this.state.reviews;

    if (this.state.isLoading) {
      reviews = <Spinner />;
    } else if (!reviews || reviews.length === 0) {
      reviews = (
        <div className={s.reviewWrapper}>
          <div className={s.reviewSidebar}>{'\u00A0'}</div>
          <div className={s.review}>
            No reviews exist. Be the first to leave a review!
          </div>
          <div className={s.clear} />
        </div>
      );
    } else {
      reviews = reviews.map(review => {
        const stars = this.getStars(review.rating, false);
        const unixDate = Date.parse(review.updatedAt);
        const date = new Date(unixDate).toLocaleDateString('en-US');

        return (
          <div key={review.id} className={s.reviewWrapper}>
            <div className={s.reviewSidebar}>{review.name}</div>
            <div className={s.review}>
              <div>
                {stars} <span className={s.date}>{date}</span>
              </div>
              <div className={s.reviewText}>{review.review}</div>
            </div>
            <div className={s.clear} />
          </div>
        );
      });
    }

    const submitText = this.state.hasReview ? 'Update' : 'Submit';
    const rating = this.state.isRating
      ? this.state.highlightRating
      : this.state.rating;
    const stars = this.getStars(rating, true);

    return (
      <div className={s.container}>
        <div className={s.bold}>Leave a review:</div>
        <div className={s.reviewSidebar}>
          <div className={s.verticalSpacer} />
          {this.state.name}
        </div>
        <form className={s.formWrapper} onSubmit={this.handleSubmit}>
          <div>{stars}</div>
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
          <input className={s.button} type="submit" value={submitText} />
        </form>
        <div className={s.clear} />
        <div className={s.reviewsContainer}>{reviews}</div>
      </div>
    );
  }
}

export default withStyles(s)(Feedback);
