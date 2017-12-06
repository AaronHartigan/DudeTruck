/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { FeedbackTest } from './Feedback';
import Spinner from '../Spinner';

describe('<Feedback />', () => {
  const context = {
    fetch: () => {},
  };
  const wrapper = shallow(
    <FeedbackTest context={context} vendorId="" shouldUpdate={() => {}} />,
  );

  test('Should initially display loading spinner', () => {
    expect(wrapper.state('isLoading')).toBeTruthy();
    expect(wrapper.find(Spinner).length).toBe(1);
  });
});
