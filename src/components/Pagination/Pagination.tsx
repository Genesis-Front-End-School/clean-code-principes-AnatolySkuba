import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  pagesTotal: number;
};

export const Pagination: FC<Props> = ({ pagesTotal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const paginationButtons = ['1', '2', '3'];

  const getPage = (number: number) => {
    setSearchParams({
      page: (currentPage + number).toString(),
    });
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0 caret-transparent"
    >
      <button
        className="p-2 ml-4 rounded hover:bg-gray-100 cursor-pointer"
        onClick={() => getPage(-1)}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {paginationButtons.map((button, i) => (
        <button
          key={i}
          className={`w-10 h-10 text-center leading-10 rounded hover:bg-gray-100 cursor-pointer ${
            currentPage.toString() === button && 'bg-gray-200 text-gray-900 font-medium'
          }`}
          onClick={() => setSearchParams({ page: button })}
        >
          {button}
        </button>
      ))}
      <button
        className="p-2 ml-4 rounded hover:bg-gray-100 cursor-pointer"
        onClick={() => getPage(1)}
        disabled={currentPage === pagesTotal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};
