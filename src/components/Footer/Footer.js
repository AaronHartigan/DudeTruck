import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>© DudeTruck</span>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/privacy">
            Privacy
          </Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/contact">
            Contact Us
          </Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/help">
            Help
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
export { Footer as FooterTest };
