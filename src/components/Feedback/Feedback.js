/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feedback.css';

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
              id,
              review,
            }
          }
        `,
        variables: {
          id: this.props.vendorId,
        },
      }),
    });
    const { data } = await resp.json();

    this.setReviews(data.feedbackList);
  }

  setReviews(reviews) {
    this.setState({
      reviews,
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

    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation feedback($revieweeId: ID!, $review: String, $rating: Int) {
            feedback(revieweeId: $revieweeId, review: $review, rating: $rating) {
              id,
              review,
              rating,
            }
          }
        `,
        variables: {
          revieweeId: this.props.vendorId,
          review: this.state.review,
          rating: this.state.null,
        },
      }),
    });
    const { data } = await resp.json();
    this.updateReviews(data.feedback);
  }

  updateReviews(review) {
    const reviews = this.state.reviews;
    const reviewIdx = reviews.findIndex(element => element.id === review.id);
    if (reviewIdx === -1) {
      reviews.push(review);
    } else {
      reviews[reviewIdx] = review;
    }

    this.setState({
      reviews,
      rating: review.rating,
    });
  }

  render() {
    const reviews = this.state.reviews.map(review => (
      <div key={review.id}>
        ({review.rating} stars) {review.review}
      </div>
    ));

    return (
      <div className={s.container}>
        <form onSubmit={this.handleSubmit}>
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
          <input className={s.button} type="submit" value="Submit" />
        </form>
        {reviews}
      </div>
    );
  }
}

export default withStyles(s)(Feedback);
