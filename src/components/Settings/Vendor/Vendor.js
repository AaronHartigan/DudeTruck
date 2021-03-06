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
      description: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      schedule: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      vegan: PropTypes.bool.isRequired,
      vegetarian: PropTypes.bool.isRequired,
      glutenFree: PropTypes.bool.isRequired,
    }),
  };

  static defaultProps = {
    settings: {
      logo: '',
      companyName: '',
      description: '',
      phone: '',
      schedule: '',
      lat: 0,
      long: 0,
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
      description: this.props.settings.description,
      phone: this.props.settings.phone,
      schedule: this.props.settings.schedule,
      lat: this.props.settings.lat,
      long: this.props.settings.long,
      vegan: this.props.settings.vegan,
      vegetarian: this.props.settings.vegetarian,
      glutenFree: this.props.settings.glutenFree,
      isLoading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.getGPS = this.getGPS.bind(this);
    this.handleCoords = this.handleCoords.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  getGPS() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handleCoords);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.showLoading();

    await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation updateVendorSettings($logo: String, $companyName: String, $description: String, $phone: String, $schedule: String, $lat: Float, $long: Float, $vegan: Boolean, $vegetarian: Boolean, $glutenFree: Boolean) {
            updateVendorSettings(logo: $logo, companyName: $companyName, description: $description, phone: $phone, schedule: $schedule, lat: $lat, long: $long vegan: $vegan, vegetarian: $vegetarian, glutenFree: $glutenFree) {
              logo,
              companyName,
              description,
              phone,
              schedule,
              lat,
              long,
              vegan,
              vegetarian,
              glutenFree,
            }
          }
        `,
        variables: {
          logo: this.state.logo,
          companyName: this.state.companyName,
          description: this.state.description,
          phone: this.state.phone,
          schedule: this.state.schedule,
          lat: this.state.lat,
          long: this.state.long,
          vegan: this.state.vegan,
          vegetarian: this.state.vegetarian,
          glutenFree: this.state.glutenFree,
        },
      }),
    });

    this.hideLoading();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  showLoading() {
    this.setState({
      isLoading: true,
    });
  }

  hideLoading() {
    this.setState({
      isLoading: false,
    });
  }

  handleCoords(pos) {
    this.setState({
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    });
  }

  handleLocation(event) {
    event.preventDefault();
    this.getGPS();
  }

  async uploadImage(file) {
    const body = new FormData();
    body.append(
      'query',
      `mutation logo {
      logo {
        logo,
      }
    }`,
    );

    body.append('file', file);

    const resp = await fetch('/graphql', {
      method: 'POST',
      body,
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    });
    const { data } = await resp.json();

    this.setState({
      logo: data.logo.logo,
    });
  }

  handleFile(event) {
    const file = event.target.files[0];
    this.uploadImage(file);
  }

  render() {
    const submitText = this.state.isLoading ? 'Saving...' : 'Save';

    return (
      <div className={s.root}>
        <h1>Vendor Settings</h1>
        <div className={s.container}>
          <div>* = required to show up in search results</div>
          <form onSubmit={this.handleSubmit}>
            <div className={s.form}>
              <label className={s.bold} htmlFor="companyName">
                * Foodtruck Name:
                <input
                  className={s.formControl}
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={this.state.companyName}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className={s.form}>
              <label className={s.bold} htmlFor="imageInput">
                Upload Logo:
                <input
                  onChange={this.handleFile}
                  id="imageInput"
                  type="file"
                  accept="image/png, image/jpeg"
                />
              </label>
              <img className={s.logo} src={this.state.logo} alt="logo" />
            </div>
            <div className={s.form}>
              <label className={s.bold} htmlFor="description">
                * Description:
                <textarea
                  className={s.formControlTextArea}
                  type="text"
                  name="description"
                  id="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className={s.form}>
              <label className={s.bold} htmlFor="phone">
                * Phone:
                <input
                  className={s.formControl}
                  type="text"
                  name="phone"
                  id="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className={s.form}>
              <label className={s.bold} htmlFor="schedule">
                * Schedule:
                <input
                  className={s.formControl}
                  type="text"
                  name="schedule"
                  id="schedule"
                  value={this.state.schedule}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className={s.bold}>I serve food that is...</div>
            <div className={s.checkbox}>
              <label htmlFor="vegetarian">
                <input
                  type="checkbox"
                  name="vegetarian"
                  id="vegetarian"
                  checked={this.state.vegetarian}
                  onChange={this.handleChange}
                />
                Vegetarian
              </label>
            </div>
            <div className={s.checkbox}>
              <label htmlFor="vegan">
                <input
                  type="checkbox"
                  name="vegan"
                  id="vegan"
                  checked={this.state.vegan}
                  onChange={this.handleChange}
                />
                Vegan
              </label>
            </div>
            <div className={s.checkbox}>
              <label htmlFor="glutenFree">
                <input
                  type="checkbox"
                  name="glutenFree"
                  id="glutenFree"
                  checked={this.state.glutenFree}
                  onChange={this.handleChange}
                />
                Gluten Free
              </label>
            </div>
            <div>
              <span className={s.bold}>* Lat: </span>
              {this.state.lat}
              <span className={s.bold}> Long: </span>
              {this.state.long}
            </div>
            <div>
              <button onClick={this.handleLocation} type="button">
                Set Location
              </button>
            </div>
            <input
              disabled={this.state.isLoading}
              className={s.button}
              type="submit"
              value={submitText}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Vendor);
export { Vendor as VendorTest };
