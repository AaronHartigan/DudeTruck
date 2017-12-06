/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { UserTest } from './User';

describe('<User />', () => {
  const context = {
    fetch: () => {},
  };
  const wrapper = shallow(<UserTest context={context} />);

  test('Should initially not be loading', () => {
    expect(wrapper.state('isLoading')).toBeFalsy();
  });
});
