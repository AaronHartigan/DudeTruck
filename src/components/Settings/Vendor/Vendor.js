import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Vendor.css';

class Vendor extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

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
    this.showLoading = this.showLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
  }

  showLoading() {
    this.setState({
      isLoading: true,
      hasRecentSaveSuccess: false,
    });
  }

  hideLoading() {
    this.setState({
      isLoading: false,
      hasRecentSaveSuccess: true,
    });

    setTimeout(() => {
      this.setState({
        hasRecentSaveSuccess: false,
      });
    }, 1250);
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

    this.showLoading();

    await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `mutation updateVendorSettings($logo: String!, $companyName: String!, $phone: String!, $schedule: String!, $location: String!, $vegan: Boolean!, $vegetarian: Boolean!, $glutenFree: Boolean!) {
          updateVendorSettings(logo: $logo, companyName: $companyName, phone: $phone, schedule: $schedule, location: $location, vegan: $vegan, vegetarian: $vegetarian, glutenFree: $glutenFree) {
            logo,
            companyName,
            phone,
            schedule,
            location,
            vegan,
            vegetarian,
            glutenFree,
          }
        }`,
        variables: {
          logo: this.state.logo,
          companyName: this.state.companyName,
          phone: this.state.phone,
          schedule: this.state.schedule,
          location: this.state.location,
          vegan: this.state.vegan,
          vegetarian: this.state.vegetarian,
          glutenFree: this.state.glutenFree,
        },
      }),
    });

    this.hideLoading();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Vendor Settings</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="companyName">
                Foodtruck Name:
                <input
                  type="text"
                  name="companyName"
                  value={this.state.companyName}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="phone">
                phone:
                <input
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="schedule">
                Schedule:
                <input
                  type="text"
                  name="schedule"
                  value={this.state.schedule}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div>I serve food that is...</div>
            <div>
              <label htmlFor="vegetarian">
                Vegetarian:
                <input
                  type="checkbox"
                  name="vegetarian"
                  checked={this.state.vegetarian}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="vegan">
                Vegan:
                <input
                  type="checkbox"
                  name="vegan"
                  checked={this.state.vegan}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="glutenFree">
                Gluten Free:
                <input
                  type="checkbox"
                  name="glutenFree"
                  checked={this.state.glutenFree}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div>ADD LOCATION SETTER HERE</div>
            <input type="submit" value="Save" />
            {this.state.isLoading && <span>Saving...</span>}
            {!this.state.isLoading && (
              <span
                className={this.state.hasRecentSaveSuccess ? s.show : s.hide}
              >
                Saved!
              </span>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Vendor);
