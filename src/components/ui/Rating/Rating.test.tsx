import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import { Rating } from './Rating';

const props = {
  rating: 3,
};

describe('should render Rating component', () => {
  afterEach(cleanup);

  it('should contain list wrapper', () => {
    const component = shallow(<Rating {...props} />);
    expect(component.find('ul').length).toBe(1);
  });
});
