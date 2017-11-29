/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import GoogleMapReact from 'google-map-react';
import { SearchTest } from './Search';
import Spinner from '../Spinner';

describe('<Search />', () => {
  const context = {
    fetch: () => {},
  };
  const wrapper = shallow(<SearchTest context={context} />);

  test('Should initially display loading spinner', () => {
    expect(wrapper.state('isLoading')).toBeTruthy();
    expect(wrapper.find(Spinner).length).toBe(1);
  });

  test('Should not display loading spinner if not isLoading', () => {
    wrapper.setState({ isLoading: false });
    expect(wrapper.state('isLoading')).toBeFalsy();
    expect(wrapper.find(Spinner).length).toBe(0);
  });

  test('Should not display GoogleMap if coordinates are null', () => {
    expect(wrapper.find(GoogleMapReact).length).toBe(0);
  });

  test('Should display GoogleMap if coordinates are numbers', () => {
    wrapper.setState({ lat: 1, long: 1 });
    expect(wrapper.find(GoogleMapReact).length).toBe(1);
  });
});
