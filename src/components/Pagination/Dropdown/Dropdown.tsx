import { Dispatch, FC, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COURSES_PER_PAGE } from '../../../utils/constants';

export type Props = {
  coursesTotal: number;
  showDropdown: boolean;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
};

export const Dropdown: FC<Props> = ({ coursesTotal, showDropdown, setShowDropdown }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || COURSES_PER_PAGE.Ten.toString();
  const coursesPerPage = Object.values(COURSES_PER_PAGE).filter(
    (item) => typeof item === 'number' && item !== +perPage
  );

  const changeCoursesPerPage = (item: number) => {
    setShowDropdown(!showDropdown);
    setSearchParams({ page: currentPage, perPage: item.toString() });

    const pagesTotalNew = Math.ceil(coursesTotal / item).toString();
    if (+currentPage > +pagesTotalNew) {
      setSearchParams({ page: pagesTotalNew, perPage: item.toString() });
    }
  };

  return (
    <div className="absolute top-8 left-7 bg-white shadow">
      <ul>
        {coursesPerPage.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => changeCoursesPerPage(+item)}
              className="py-2 px-4 hover:bg-gray-100"
            >
              {`${item} items`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
