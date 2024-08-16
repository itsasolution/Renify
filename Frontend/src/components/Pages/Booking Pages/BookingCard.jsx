
const BookingCard = ({ data, status,user }) => {
  const { brand, model, images } = data;
  return (
    <div className="group cardanime floatEffect relative z-10 w-auto min-w-60 max-w-80 lg:max-w-[340px] rounded-xl m-1.5 h-full overflow-hidden bg-gradient-to-br from-white  via-sky-50 to-sky-100 dark:bg-gradient-to-bl  dark:from-[#00293f] dark:via-blue-950 dark:to-slate-950  duration-200 hover:-translate-y-[2px] dark:hover:ring-green-400 dark:ring-1 dark:hover:ring-2 ring-white  ">
      <div className="h-60 w-full">
        <img
          src={images[0]}
          alt={model}
          className="h-full group-hover:scale-105 duration-700 delay-200 w-full"
        />
      </div>

      <div className="flex-col px-3 py-1 mt-1 relative">
        <span className=" absolute top-1 font-semibold text-green-400 right-2">
          {status}
        </span>

        <h3 className="font-semibold text-lg">{model}</h3>
        <h4 className="font-semibold text-slate-500">{brand}</h4>
        <div className="rating">
          {/* rating */}
          <div className="flex items-center mb-1 space-x-1 ">
            <span className="mr-1">{data?.overallRating}</span>
            {Array.from({ length: data?.overallRating }).map((_, i) => (
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
            {Array.from({ length: 5 - data?.overallRating }).map((_, i) => (
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
        <div className="">
          <div className="">
          Renter : 
            <span className="font-semibold mx-1 ">
              {user.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
