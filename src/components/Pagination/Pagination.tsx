import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import sprite from '../../assets/sprite.svg';
import { COURSES_PER_PAGE } from '../../utils/constants';

type Props = {
  coursesTotal: number;
};

export const Pagination: FC<Props> = ({ coursesTotal }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || COURSES_PER_PAGE.Ten.toString();
  const pagesTotal = Math.ceil(coursesTotal / +perPage).toString();

  const getPaginationButtons = (currentPage: string, pagesTotal: string) => {
    if (+pagesTotal < 6) {
      return Array.from({ length: +pagesTotal }, (_, i) => (i + 1).toString());
    } else {
      if (+currentPage < 4) {
        return ['1', '2', '3', '...', pagesTotal];
      } else if (+currentPage > +pagesTotal - 3) {
        return ['1', '...', (+pagesTotal - 2).toString(), (+pagesTotal - 1).toString(), pagesTotal];
      } else {
        return ['1', '...', currentPage, '...', pagesTotal];
      }
    }
  };

  const paginationButtons = getPaginationButtons(currentPage, pagesTotal);

  const getPage = (page: number | string, index: number = 0) => {
    if (typeof page === 'number') {
      setSearchParams({
        page: (+currentPage + page).toString(),
        perPage,
      });
    } else {
      +page
        ? setSearchParams({ page, perPage })
        : setSearchParams({
            page: Math.floor(
              (+paginationButtons[index - 1] + +paginationButtons[index + 1]) / 2
            ).toString(),
            perPage,
          });
    }
  };

  const showingTo = +currentPage * +perPage;
  const showing = `Showing from ${(+currentPage - 1) * +perPage + 1} to ${
    showingTo < coursesTotal ? showingTo : coursesTotal
  } of ${coursesTotal} entries`;

  const changeCoursesPerPage = (item: number) => {
    setShowDropdown(!showDropdown);
    setSearchParams({ page: currentPage, perPage: item.toString() });

    const pagesTotalNew = Math.ceil(coursesTotal / item).toString();
    if (+currentPage > +pagesTotalNew) {
      setSearchParams({ page: pagesTotalNew, perPage: item.toString() });
    }
  };

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
            <div className="absolute top-8 left-7 bg-white shadow">
              <ul>
                {Object.values(COURSES_PER_PAGE).map(
                  (item, i) =>
                    typeof item === 'number' &&
                    item !== +perPage && (
                      <li key={i}>
                        <button
                          onClick={() => changeCoursesPerPage(item)}
                          className="py-2 px-4 hover:bg-gray-100"
                        >
                          {`${item} items`}
                        </button>
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
        </div>
        <p className="text-gray-500 mt-4 lg:mt-0">{showing}</p>
      </div>

      <nav aria-label="Pagination" className="flex justify-center items-center text-gray-600 mt-6">
        <button
          className="p-2 mr-1 rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => getPage(-1)}
          disabled={currentPage === '1'}
        >
          <svg className="h-6 w-6" strokeWidth="2">
            <use href={sprite + '#arrow'}></use>
          </svg>
        </button>
        {paginationButtons.map((button, i) => (
          <button
            key={i}
            className={`w-10 h-10 mx-1 text-center rounded hover:bg-gray-100 cursor-pointer ${
              currentPage === button && 'bg-gray-200 text-gray-900 font-medium'
            }`}
            onClick={() => getPage(button, i)}
          >
            {button}
          </button>
        ))}
        <button
          className="p-2 ml-1 rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => getPage(1)}
          disabled={currentPage === pagesTotal}
        >
          <svg className="h-6 w-6 rotate-180" strokeWidth="2">
            <use href={sprite + '#arrow'}></use>
          </svg>
        </button>
      </nav>
    </div>
  );
};
