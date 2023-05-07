import React from 'react';
import { shallow } from 'enzyme';
import { Error } from './Error';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '../../utils/constants';

describe('Error component', () => {
  it('renders a 404 error message', () => {
    const wrapper = shallow(<Error />);
    const title = wrapper.find('.text-6xl');
    const message = wrapper.find('.text-xl');
    const description = wrapper.find('.text-lg');

    expect(title.text()).toEqual('404');
    expect(message.text()).toEqual('Oops. This page has gone missing.');
    expect(description.text()).toEqual(
      'You may have mistyped the address or the page may have moved.'
    );
  });

  it('renders a link to the home page', () => {
    const wrapper = shallow(<Error />);
    const link = wrapper.find(Link);

    expect(link.prop('to')).toEqual(`/${ROUTER_KEYS.COURSES}`);
    expect(link.text()).toEqual('Go Home');
    expect(link.hasClass('border')).toBe(true);
    expect(link.hasClass('border-white')).toBe(true);
    expect(link.hasClass('rounded')).toBe(true);
    expect(link.hasClass('p-4')).toBe(true);
  });
});
