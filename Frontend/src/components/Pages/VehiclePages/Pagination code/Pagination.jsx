// src/Paginate.js
import React from "react";
import generatePageNumbers from "./generatePageNumbers ";

const Paginate = (prop) => {
  const {
    handleNextPage,
    handlePrevPage,
    handlePageClick,
    currentPage,
    totalPages,
  } = prop;

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <>
      <div className="flex items-center justify-center my-4">
        <button
          className="group flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4 group-hover:scale-[1.1] duration-150 group-hover:-translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
          Previous
        </button>
        <div className="flex items-center gap-2">
          {pageNumbers.map((number, index) =>
            number === "..." ? (
              <span key={index}>...</span>
            ) : (
              <button
                key={number}
                onClick={() => handlePageClick(number)}
                disabled={number === currentPage}
                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-800 dark:bg-slate-800 text-center align-middle font-sans text-sm font-medium text-white shadow  hover:shadow-lg active:opacity-[0.85]  disabled:pointer-events-none  disabled:opacity-60 disabled:cursor-not-allowed hover:ring-1 disabled:ring-1 dark:disabled:opacity-100  dark:ring-white `}
              >
                {number}
              </button>
            )
          )}
        </div>

        <button
          className="group flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4 group-hover:scale-[1.1] duration-150 group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default Paginate;
