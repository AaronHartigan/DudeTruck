/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { StarsTest } from './Stars';

describe('<Stars />', () => {
  const wrapper = shallow(<StarsTest />);

  test('Should defaultly display 0 active stars with no props', () => {
    expect(wrapper.find('.active').length).toBe(0);
  });

  test('Should defaultly display 5 faded stars with no props', () => {
    expect(wrapper.find('.faded').length).toBe(5);
  });
});
