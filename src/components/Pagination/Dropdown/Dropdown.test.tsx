import React from 'react';
import { shallow } from 'enzyme';
import { useSearchParams } from 'react-router-dom';
import { Dropdown, Props } from './Dropdown';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

describe('Dropdown', () => {
  const props: Props = {
    coursesTotal: 20,
    showDropdown: true,
    setShowDropdown: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('?page=1&perPage=10')]);
  });

  it('should render the correct list in the dropdown list', () => {
    const wrapper = shallow(<Dropdown {...props} />);

    expect(wrapper.find('ul')).toHaveLength(1);
  });

  it('should update perPage in the search params when button is clicked', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('?page=1&perPage=10');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    render(<Dropdown {...props} />);
    fireEvent.click(screen.getByText('20 items'));

    expect(setSearchParams).toHaveBeenCalledWith({ page: '1', perPage: '20' });
  });

  it('should update perPage in the search params when button is clicked, and the current page is more than all pages', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('?page=2&perPage=10');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    render(<Dropdown {...props} />);
    fireEvent.click(screen.getByText('20 items'));

    expect(setSearchParams).toHaveBeenCalledWith({ page: '1', perPage: '20' });
  });

  it('currentPage and perPage should be set correctly without the search params', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    render(<Dropdown {...props} />);
    fireEvent.click(screen.getByText('20 items'));

    expect(setSearchParams).toHaveBeenCalledWith({ page: '1', perPage: '20' });
  });
});
