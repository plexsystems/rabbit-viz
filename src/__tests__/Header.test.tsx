import { mount } from 'enzyme';
import * as React from 'react';

import Header from '../components/Header';

describe('<Header />', () => {
  it('renders the app name in the header bar', () => {
    const header = mount(<Header />);
    expect(header.find('.header.item').text()).toEqual('Rabbit Viz');
  });
});