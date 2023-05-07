import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import sprite from '../../../assets/sprite.svg';
import { COURSES_PER_PAGE } from '../../../utils/constants';
import { NumberNavigation } from './NumberNavigation';

type Props = {
  coursesTotal: number;
};

export const Navigation: FC<Props> = ({ coursesTotal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || COURSES_PER_PAGE.Ten.toString();
  const pagesTotal = Math.ceil(coursesTotal / +perPage).toString();

  const getPage = (page: number) => {
    setSearchParams({
      page: (+currentPage + page).toString(),
      perPage,
    });
  };

  return (
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
      <NumberNavigation coursesTotal={coursesTotal} />
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
  );
};
