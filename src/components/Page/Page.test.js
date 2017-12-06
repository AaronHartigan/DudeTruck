/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { PageTest } from './Page';

describe('<Page />', () => {
  const wrapper = shallow(<PageTest title="test" html="" />);

  test('Should have a .root and .container div', () => {
    expect(wrapper.find('.root').length).toBe(1);
    expect(wrapper.find('.container').length).toBe(1);
  });

  test('Should display title in <h1>', () => {
    expect(wrapper.contains(<h1>test</h1>)).toBeTruthy();
  });
});
