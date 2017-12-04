import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Stars.css';

/* eslint-disable react/jsx-no-bind */

class Stars extends React.Component {
  static propTypes = {
    rating: PropTypes.node,
    interactive: PropTypes.bool,
    onRate: PropTypes.func,
    willRate: PropTypes.func,
    onCancelRate: PropTypes.func,
  };

  static defaultProps = {
    rating: 0,
    interactive: false,
    onRate: () => {},
    willRate: () => {},
    onCancelRate: () => {},
  };

  render() {
    const interactive = this.props.interactive || false;
    const rating = this.props.rating;

    const stars = [1, 2, 3, 4, 5].map(num => {
      const interactiveClass = interactive ? s.interactive : null;
      const activeClass = rating >= num ? s.active : s.faded;
      const classNames = cx(interactiveClass, activeClass);
      return (
        <span
          key={num}
          role="presentation"
          className={classNames}
          onClick={interactive ? this.props.onRate.bind(this, num) : null}
          onMouseEnter={
            interactive ? this.props.willRate.bind(this, num) : null
          }
        >
          ★
        </span>
      );
    });

    return (
      <span
        className={s.star}
        onMouseLeave={interactive ? this.props.onCancelRate : null}
      >
        {stars}
      </span>
    );
  }
}

export default withStyles(s)(Stars);
