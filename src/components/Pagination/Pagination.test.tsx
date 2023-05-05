import { useSearchParams as useReactRouterSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { shallow } from 'enzyme';

import { Pagination } from './Pagination';
import { COURSES_PER_PAGE } from '../../utils/constants';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

describe('Pagination', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    (useReactRouterSearchParams as jest.Mock).mockReset();

    // Mock the return value of useSearchParams
    const mockSearchParams = new URLSearchParams('perPage=10&page=1');
    (useReactRouterSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);
  });

  it('renders the component without errors', () => {
    const wrapper = shallow(<Pagination coursesTotal={50} />);
    expect(wrapper.exists()).toBe(true);
  });

  // it('displays the correct number of pages', () => {
  //   const wrapper = shallow(<Pagination coursesTotal={50} />);
  //   const pagesTotal = Math.ceil(50 / COURSES_PER_PAGE.Ten).toString();
  //   const paginationButtons = wrapper.instance().getPaginationButtons('1', pagesTotal);
  //   expect(paginationButtons.length).toBe(5);
  // });

  // it('updates the page when clicking the pagination buttons', () => {
  //   const setSearchParamsMock = jest.fn();
  //   const wrapper = shallow(<Pagination coursesTotal={50} />);
  //   console.log(37, wrapper.debug());
  //   wrapper.findWhere((x) => x.type() === 'button' && x.text() === '1').simulate('click');

  //   expect(setSearchParamsMock).toHaveBeenCalledWith({ page: '2', perPage: '10' });
  // });

  it('opens the dropdown when clicking the items button', () => {
    const wrapper = shallow(<Pagination coursesTotal={50} />);
    expect(wrapper.find('ul').length).toBe(0);
    wrapper.findWhere((x) => x.type() === 'button' && x.text() === '10 items').simulate('click');
    expect(wrapper.find('ul').length).toBe(1);
  });

  // it('changes the number of items per page when clicking an option in the dropdown', () => {
  //   const setSearchParamsMock = jest.fn();
  //   (useSearchParams as jest.Mock).mockReturnValue([
  //     { page: '1', perPage: '20' },
  //     setSearchParamsMock,
  //   ]);
  //   jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('some value');

  //   const wrapper = shallow(<Pagination coursesTotal={50} />);
  //   wrapper.find('button.inline-flex').simulate('click');
  //   wrapper.find('button[children="20 items"]').simulate('click');
  //   console.log(58, wrapper.debug());
  //   // expect(setSearchParamsMock).toHaveBeenCalledWith({ page: '1', perPage: '20' });
  // });
});
