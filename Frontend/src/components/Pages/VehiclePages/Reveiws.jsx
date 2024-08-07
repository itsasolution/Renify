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
          className="absolute -top-3 w-fit right-2  hover:text-sky-400 font-semibold"
          onClick={() => setAllReviewsVisible(!allReviewsVisible)}
        >
          {allReviewsVisible ? "Hide Reviews" : "Show All Reviews"}
        </button>
        <div
          className={`overflow-y-scroll scroll bg-slate-200 flex flex-wrap dark:bg-slate-900/90 rounded-md  p-1 ${
            allReviewsVisible ? "h-fit" : "h-40"
          }`}
        >
          {!reviews?.length > 0 ? (
            <p className="h-full text-lg w-full grid place-items-center">
              No Reviews Available
            </p>
          ) : (
            reviews?.map((review, index) =>
              review.text === "" ? (
                ""
              ) : (
                <article
                  key={index}
                  className={`z-10 m-1 w-[300px] p-1 py-2 dark:bg-gradient-to-tr bg-gradient-to-t from-sky-200/30 to-slate-100   dark:from-blue-950/90 dark:to-slate-800/80 shadow hover:shadow-md rounded-md leading-5 overflow-hidden hover:-translate-y-0.5 ring-1 ring-sky-600 hover:ring-sky-400  duration-200 ${
                    expandedReviewIndex === index ? "h-fit" : "h-36"
                  }`}
                >
                  {/* img - rating */}
                  <div className="flex justify-between">
                    {/* img and name */}
                    <div className="flex items-center  mb-2">
                      <img
                        className="w-12 h-12 me-2  rounded-full"
                        src={`${process.env.PUBLIC_URL}/profile.webp`}
                        alt=""
                      />
                      <div className="font-medium ">
                        <p>
                          {review?.user}
                          <time
                            dateTime={review.date}
                            className="block text-sm text-gray-500 my-1 dark:text-gray-300"
                          >
                            {new Date(review.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })}
                          </time>
                        </p>
                      </div>
                    </div>
                    {/* rating */}
                    <div className="flex items-center mb-3 space-x-1 mr-2 rtl:space-x-reverse">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-300  "
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

                  <p className="mb-2 text-gray-600 dark:text-gray-200 p-1 px-2">
                    {expandedReviewIndex === index
                      ? review.text
                      : `${review.text.substring(0, 80)}`}

                    <button
                      className="text-sky-500 hover:text-sky-400 ml-1"
                      onClick={() => toggleExpansion(index)}
                    >
                      {expandedReviewIndex === index
                        ? "Read Less"
                        : "Read More"}
                    </button>
                  </p>
                </article>
              )
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
