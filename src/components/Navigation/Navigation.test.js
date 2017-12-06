/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { NavigationTest } from './Navigation';

describe('<Navigation />', () => {
  const wrapper = shallow(<NavigationTest isLoggedIn />);

  test('Should display Logout if user is logged in', () => {
    expect(wrapper.find({ to: '/logout' }).length).toBe(1);
  });

  test('Should display login if user is logged out', () => {
    wrapper.setProps({ isLoggedIn: false });
    expect(wrapper.find({ to: '/login' }).length).toBe(1);
  });
});
