/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../components/Link';
import s from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>DudeTruck</h1>
          <p className={s.bannerDesc}>Leads you to a foodtruck</p>
        </div>
        <div className={s.paragraph}>
          DudeTruck is the premiere website for locating foodtrucks. Our
          proprietary software allows you to find foodtrucks in your area and
          filter them based on your dietary needs. Whether you are gluten-free
          or vegan, DudeTruck can locate all accomadating foodtrucks in the
          area.
        </div>
        <div className={s.paragraph}>
          If you own a foodtruck and are trying to advertise, DudeTruck is the
          perfect platform. DudeTruck allows you to assemble information about
          your foodtruck and display it to the world. After logging into the
          DudeTruck app, you can set your current location for anyone to see.
        </div>
        <div className={s.register}>Don&apos;t delay, sign up today!</div>
        <div>
          <Link className={s.button} to="/register">
            SIGN UP
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
