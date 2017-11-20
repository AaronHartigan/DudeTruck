import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logout.css';

class Logout extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      window.location.reload();
    }, 1250);
  }

  render() {
    return <div className={s.text}>Logging out...</div>;
  }
}

export default withStyles(s)(Logout);
