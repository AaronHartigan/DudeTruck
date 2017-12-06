/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { SpinnerTest } from './Spinner';

describe('<Spinner />', () => {
  const wrapper = shallow(<SpinnerTest />);

  test('Should display a loading div', () => {
    expect(wrapper.find('.loader').length).toBe(1);
  });
});
