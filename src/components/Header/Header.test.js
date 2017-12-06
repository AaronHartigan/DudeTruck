/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { HeaderTest } from './Header';

describe('<Header />', () => {
  const wrapper = shallow(<HeaderTest isLoggedIn />);

  test('Should display Navigation and pass in props', () => {
    expect(wrapper.find({ isLoggedIn: true })).toBeTruthy();
    wrapper.setProps({ isLoggedIn: false });
    expect(wrapper.find({ isLoggedIn: false })).toBeTruthy();
  });
});
