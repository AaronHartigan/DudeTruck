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
      name: PropTypes.string,
      age: PropTypes.number,
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
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
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
        query: `
          mutation updateUserSettings($name: String, $age: Int, $vegan: Boolean, $vegetarian: Boolean, $glutenFree: Boolean) {
            updateUserSettings(name: $name, age: $age, vegan: $vegan, vegetarian: $vegetarian, glutenFree: $glutenFree) {
              name,
              age,
              vegan,
              vegetarian,
              glutenFree,
            }
          }
        `,
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
    const submitText = this.state.isLoading ? 'Saving...' : 'Save';

    return (
      <div className={s.root}>
        <h1>User Settings</h1>
        <div className={s.container}>
          <div className={s.bold}>I am...</div>
          <form onSubmit={this.handleSubmit}>
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
            <div className={s.form}>
              <label className={s.bold} htmlFor="name">
                Name:
                <input
                  className={s.formControl}
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name || ''}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className={s.form}>
              <label className={s.bold} htmlFor="age">
                Age:
                <input
                  className={s.formControl}
                  type="number"
                  name="age"
                  id="age"
                  value={this.state.age || ''}
                  onChange={this.handleChange}
                />
              </label>
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

export default withStyles(s)(User);
export { User as UserTest };
