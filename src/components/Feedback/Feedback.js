import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feedback.css';
import Stars from '../Stars';
import Spinner from '../Spinner';

class Feedback extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  static propTypes = {
    vendorId: PropTypes.string.isRequired,
    shouldUpdate: PropTypes.func.isRequired,
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
      isUpdating: false,
      isLoading: true,
      hasRatingError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setReviews = this.setReviews.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
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
      hasReview = !!myReview.rating;
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
      this.state.rating > 5 ||
      this.state.review.length === 0
    ) {
      this.setState({
        hasRatingError: true,
      });
      return;
    }

    this.setState({
      hasRatingError: false,
      isUpdating: true,
    });

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

    if (!(data || data.feedback)) {
      this.setState({
        isUpdating: false,
      });
    }

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
      reviews[idx].name = review.name || '\u00A0';
      reviews[idx].age = review.age;
      reviews[idx].updatedAt = review.updatedAt;
    }

    reviews.sort((a, b) => Date.parse(a.updatedAt) < Date.parse(b.updatedAt));

    this.setState({
      reviews,
      rating: review.rating,
      isUpdating: false,
      hasReview: true,
    });
    this.props.shouldUpdate();
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
        const unixDate = Date.parse(review.updatedAt);
        const date = new Date(unixDate).toLocaleDateString('en-US');

        return (
          <div key={review.id} className={s.reviewWrapper}>
            <div className={s.reviewSidebar}>
              <div className={s.verticalSpacerSmall} />
              {review.name}
            </div>
            <div className={s.review}>
              <div>
                <Stars rating={review.rating} />
                <span className={s.date}> {date}</span>
              </div>
              <div className={s.reviewText}>{review.review}</div>
            </div>
            <div className={s.clear} />
          </div>
        );
      });
    }

    let submitText = 'Submit';
    if (this.state.isUpdating) {
      submitText = 'Saving...';
    } else if (this.state.hasReview) {
      submitText = 'Update';
    }
    const rating = this.state.isRating
      ? this.state.highlightRating
      : this.state.rating;

    return (
      <div className={s.container}>
        <div className={s.bold}>Leave a review:</div>
        <div className={s.reviewSidebar}>
          <div className={s.verticalSpacer} />
          {this.state.name}
        </div>
        <form className={s.formWrapper} onSubmit={this.handleSubmit}>
          <div>
            <Stars
              rating={rating}
              interactive
              onRate={this.onRate}
              willRate={this.willRate}
              onCancelRate={this.onCancelRate}
            />
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
          <input
            className={s.button}
            type="submit"
            disabled={this.state.isUpdating}
            value={submitText}
          />
          {this.state.hasRatingError ? (
            <div className={s.error}>
              Please set a star rating and leave a comment.
            </div>
          ) : null}
        </form>
        <div className={s.clear} />
        <div className={s.reviewsContainer}>{reviews}</div>
      </div>
    );
  }
}

export default withStyles(s)(Feedback);
export { Feedback as FeedbackTest };
