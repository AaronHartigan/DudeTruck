/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { LinkTest } from './Link';

describe('<Link />', () => {
  const wrapper = shallow(
    <LinkTest to="/test">
      <div />
    </LinkTest>,
  );

  test('Should display a link element based on props', () => {
    expect(wrapper.find({ href: '/test' })).toBeTruthy();
  });
});
