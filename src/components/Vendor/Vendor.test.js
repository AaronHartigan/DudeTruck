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

  test('Should defaultly display an error with no props', () => {
    expect(wrapper.props('error')).toBeTruthy();
    expect(wrapper.find('.error').length).toBe(1);
  });

  test('Should not display an error if error prop set false', () => {
    wrapper.setProps({ error: false });
    expect(wrapper.find('.error').length).toBe(0);
  });
});
