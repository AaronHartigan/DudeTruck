/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { VendorTest } from './Vendor';

describe('<Vendor />', () => {
  const context = {
    fetch: () => {},
  };
  const wrapper = shallow(<VendorTest context={context} />);

  test('Should initially not be loading', () => {
    expect(wrapper.state('isLoading')).toBeFalsy();
  });
});
