import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Vendor.css';

class Vendor extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Vendor Settings Header!</h1>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Vendor);
