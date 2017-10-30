import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../Link';
import s from './Vendor.css';

class Vendor extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Vendor Settings Header!</h1>
          <dl>
            <dt>Vegan</dt>
            <select>
              <option value="vegan">Vegan</option>
              <option value="nonVegan">Non-Vegan</option>
            </select>

            <dt>Vegetarian</dt>
            <select>
              <option value="vegetarian">Vegetarian</option>
              <option value="nonVegetarian">Non-Vegetarian</option>
            </select>

            <dt>Gluten-Free</dt>
            <select>
              <option value="glutenFree">Gluten-Free</option>
              <option value="nonGlutenFree">Non-Gluten-Free</option>
            </select>
          </dl>
          <button type="button">Save</button> &nbsp;&nbsp;&nbsp;
          <button type="button">Set Location </button>&nbsp;&nbsp;&nbsp;
          <Link to="/logout">
            <button type="button">Log out</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Vendor);
