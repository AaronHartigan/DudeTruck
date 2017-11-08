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
 import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
 import getMuiTheme from 'material-ui/styles/getMuiTheme';
 import {GridList, GridTile} from 'material-ui/GridList';
 import png1 from './bacon_mania_sm.png';
 import png2 from './buckhorn_grill_sm.png';
 import png3 from './anhonestpie_sm.png';
 import png4 from './Annies_SnoBiz_sm.png';
 import png5 from './azteca_logo_sm.png';
 import png6 from './chandos_tacos.png';
 import png7 from './chebuono_logo_sm.png';
 import png8 from './cecils_sm.png';
 import png9 from './Green_Papaya_sm.png';
 import png10 from './Flavor_Face_sm.png';
 import png11 from './dogtown_sm.png';
 import png12 from './cichyco_sm.png';
 import png13 from './Costas_Finest_sm.png';
 import png14 from './cowtown-creamery-logo-sm.png';
 import png15 from './Drewskis_sm.png';
 import png16 from './Gameday_Grill_sm.png';

 const styles = {
   root: {
     display: 'flex',
     flexWrap: 'wrap',
     justifyContent: 'space-around',
   },
   gridList: {
     display: 'flex',
     flexWrap: 'nowrap',
     overflowX: 'auto',
   },
 };

 const tilesData = [
   {
     img: png1,
   },
   {
     img: png2,
   },
   {
     img: png3,
   },
   {
     img: png4,
   },
   {
     img: png5,
   },
   {
     img: png6,
   },
   {
     img: png7,
   },
   {
     img: png8,
   },
   {
     img: png9,
   },
   {
     img: png10,
   },
   {
     img: png11,
   },
   {
     img: png12,
   },
   {
     img: png13,
   },
   {
     img: png14,
   },
   {
     img: png15,
   },
   {
     img: png16,
   },
 ];

 /**
  * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
  */

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
        <div style={styles.root}>
          <MuiThemeProvider>
            <GridList style={styles.gridList}>
              {tilesData.map((tile) => (
                <GridTile>
                    <img src={tile.img} />
                </GridTile>
              ))}
            </GridList>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
