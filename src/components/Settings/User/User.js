import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './User.css';

class User extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  static propTypes = {
    settings: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      vegan: PropTypes.bool.isRequired,
      vegetarian: PropTypes.bool.isRequired,
      glutenFree: PropTypes.bool.isRequired,
    }),
  };

  static defaultProps = {
    settings: {
      name: '',
      age: 0,
      vegan: false,
      vegetarian: false,
      glutenFree: false,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.settings.name,
      age: this.props.settings.age,
      vegan: this.props.settings.vegan,
      vegetarian: this.props.settings.vegetarian,
      glutenFree: this.props.settings.glutenFree,
      isLoading: false,
      hasRecentSaveSuccess: false,
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
        query: `mutation updateUserSettings($name: String!, $age: Int!, $vegan: Boolean!, $vegetarian: Boolean!, $glutenFree: Boolean!) {
          updateUserSettings(name: $name, age: $age, vegan: $vegan, vegetarian: $vegetarian, glutenFree: $glutenFree) {
            name,
            age,
            vegan,
            vegetarian,
            glutenFree,
          }
        }`,
        variables: {
          name: this.state.name,
          age: this.state.age,
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
          <h1>User Settings</h1>
          <div>I am...</div>
          <form onSubmit={this.handleSubmit}>
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
            <div>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="age">
                Age:
                <input
                  type="number"
                  name="age"
                  value={this.state.age}
                  onChange={this.handleChange}
                />
              </label>
            </div>
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

export default withStyles(s)(User);
