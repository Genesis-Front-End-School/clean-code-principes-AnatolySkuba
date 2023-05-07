import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import sprite from '../../assets/sprite.svg';
import { COURSES_PER_PAGE } from '../../utils/constants';
import { Dropdown } from './Dropdown';
import { Navigation } from './Navigation';

type Props = {
  coursesTotal: number;
};

export const Pagination: FC<Props> = ({ coursesTotal }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || COURSES_PER_PAGE.Ten.toString();
  const showingTo = +currentPage * +perPage;
  const showing = `Showing from ${(+currentPage - 1) * +perPage + 1} to ${
    showingTo < coursesTotal ? showingTo : coursesTotal
  } of ${coursesTotal} entries`;

  return (
    <div className="mb-8 flex flex-col items-center justify-center">
      <div className="text-xs">
        <div className="relative text-gray-600 font-medium text-center">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 px-4 hover:bg-gray-100 inline-flex"
          >
            {`${perPage} items`}
            <svg className="h-4 w-4 ml-2 -rotate-90" strokeWidth="2">
              <use href={sprite + '#arrow'}></use>
            </svg>
          </button>
          {showDropdown && (
            <Dropdown
              coursesTotal={coursesTotal}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
            />
          )}
        </div>
        <p className="text-gray-500 mt-4 lg:mt-0">{showing}</p>
      </div>
      <Navigation coursesTotal={coursesTotal} />
    </div>
  );
};
