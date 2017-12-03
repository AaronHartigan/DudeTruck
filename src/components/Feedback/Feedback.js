import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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
      rating: '',
      hasReview: false,
      isLoading: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setReviews = this.setReviews.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
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

  setReviews(data = {}) {
    const reviews = data.feedbackList || [];
    const myReview = data.myReview;

    let review = '';
    let rating = '';
    let hasReview = false;
    if (myReview) {
      review = myReview.review;
      rating = myReview.rating;
      hasReview = true;
    }

    this.setState({
      reviews,
      review,
      rating,
      isLoading: false,
      hasReview,
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
              id,
              review,
              rating,
              updatedAt,
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
      reviews[idx].updatedAt = review.updatedAt;
    }

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
        <div>Sorry! No reviews exist. Be the first to leave a review!</div>
      );
    } else {
      reviews = reviews.map(review => {
        const stars = [1, 2, 3, 4, 5].map(elem => {
          if (review.rating >= elem) {
            return (
              <span key={elem} className={s.active}>
                ★
              </span>
            );
          }
          return (
            <span key={elem} className={s.faded}>
              ★
            </span>
          );
        });
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

    return (
      <div className={s.container}>
        <div className={s.reviewSidebar}>Name</div>
        <form className={s.formWrapper} onSubmit={this.handleSubmit}>
          <div className={s.form}>
            <label className={s.bold} htmlFor="rating">
              Rating:
              <input
                className={s.formControl}
                type="number"
                name="rating"
                id="rating"
                value={this.state.rating}
                onChange={this.handleChange}
              />
            </label>
          </div>
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
