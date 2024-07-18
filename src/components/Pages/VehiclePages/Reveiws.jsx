import React, { useState } from "react";

const Reviews = ({ reviews }) => {
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
  const [allReviewsVisible, setAllReviewsVisible] = useState(false);

  const toggleExpansion = (index) => {
    setExpandedReviewIndex(expandedReviewIndex === index ? null : index);
  };

  return (
    <>
      <div className="relative m-5 my-10 duration-200 ">
        <div className="mx-3 text-lg font-semibold">
          Total Reviews : <span className="">{reviews?.length}</span>
        </div>

        <button
          className="absolute -top-3 w-fit right-2  hover:text-sky-400 hover:underline font-semibold"
          onClick={() => setAllReviewsVisible(!allReviewsVisible)}
        >
          {allReviewsVisible ? "Hide Reviews" : "Show All Reviews"}
        </button>
        <div
          className={`overflow-y-scroll scroll bg-slate-200 flex flex-wrap dark:bg-slate-900/90 rounded-md  p-1 ${
            allReviewsVisible ? "h-fit" : "h-40"
          }`}
        >
          {reviews?.map((review, index) =>
            review.text === "" ? (
              ""
            ) : (
              <article
                key={index}
                className={`z-10 m-1 w-[300px] p-1 py-2 bg-slate-100/90 dark:bg-gradient-to-tr from-slate-900/80 to-slate-800/80 shadow hover:shadow-md rounded-md leading-5 overflow-hidden hover:-translate-y-0.5 ring-1 duration-200 ${
                  expandedReviewIndex === index ? "h-fit" : "h-36"
                }`}
              >
                {/* img - rating */}
                <div className="flex justify-between">
                  {/* img and name */}
                  <div className="flex items-center mb-4">
                    <img
                      className="w-10 h-10 me-4 rounded-full"
                      src={`${process.env.PUBLIC_URL}/profile.webp`}
                      alt=""
                    />
                    <div className="font-medium dark:text-white">
                      <p>
                        {/* {review.user?.name} */}
                        {review.user}
                        <time
                          dateTime={review.date}
                          className="block text-sm text-gray-500 dark:text-gray-400"
                        >
                          {new Date(review.date).toLocaleDateString()}
                        </time>
                      </p>
                    </div>
                  </div>
                  {/* rating */}
                  <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <p className="mb-2 text-gray-600 dark:text-gray-300 p-1">
                  {expandedReviewIndex === index
                    ? review.text
                    : `${review.text.substring(0, 100)}`}

                  <button
                    className="text-blue-500 hover:underline ml-1"
                    onClick={() => toggleExpansion(index)}
                  >
                    {expandedReviewIndex === index ? "Read Less" : "Read More"}
                  </button>
                </p>
              </article>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
