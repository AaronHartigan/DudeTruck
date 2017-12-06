/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { FooterTest } from './Footer';

describe('<Footer />', () => {
  const wrapper = shallow(<FooterTest isLoggedIn />);

  test('Should link to Contact Us, Privacy, and Help', () => {
    expect(wrapper.find({ to: '/contact' })).toBeTruthy();
    expect(wrapper.find({ to: '/privacy' })).toBeTruthy();
    expect(wrapper.find({ to: '/help' })).toBeTruthy();
  });
});
