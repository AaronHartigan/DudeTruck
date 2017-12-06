/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { MarkerTest } from './Marker';

describe('<Marker />', () => {
  const wrapper = shallow(<MarkerTest text="hi" />);

  test('Should display the passed in text', () => {
    expect(wrapper.contains('hi')).toBeTruthy();
  });
});
