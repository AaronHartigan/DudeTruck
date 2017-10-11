import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './User.css';

class User extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>User Settings Header!</h1>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(User);
