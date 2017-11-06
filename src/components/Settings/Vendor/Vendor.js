import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../Link';
import s from './Vendor.css';

class Vendor extends React.Component {
  static propTypes = {
    settings: PropTypes.shape({
      logo: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      schedule: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      vegan: PropTypes.bool.isRequired,
      vegetarian: PropTypes.bool.isRequired,
      glutenFree: PropTypes.bool.isRequired,
    }),
  };

  static defaultProps = {
    settings: {
      logo: '',
      companyName: '',
      phone: '',
      schedule: '',
      location: '',
      vegan: false,
      vegetarian: false,
      glutenFree: false,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      logo: this.props.settings.logo,
      companyName: this.props.settings.companyName,
      phone: this.props.settings.phone,
      schedule: this.props.settings.schedule,
      location: this.props.settings.location,
      vegan: this.props.settings.vegan,
      vegetarian: this.props.settings.vegetarian,
      glutenFree: this.props.settings.glutenFree,
      isLoading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

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
