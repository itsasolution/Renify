import React, { useEffect, useState } from "react";

const ImageSection = ({ vehicle, setImage, image }) => {
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const [backSize, setbackSize] = useState("cover");

  const changeImage = (index) => {
    setImage(vehicle?.images[index]);
  };

  useEffect(() => {
    setImage(vehicle?.images[0]);
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
    setbackSize("200%");
  };

  const handleLeave = (e) => {
    setBackgroundPosition(`center`);
    setbackSize("cover");
  };
  return (
    <div className="md:mx-5 max-w-[600px] max-h-[500px] md:min-h-[500px] m-2 flex gap-1 md:gap-2 flex-col">
      <div className=" w-full md:h-[80%] h-72 ">
        <div
          className="image-container rounded-xl shadow-md   h-full p-1 w-full overflow-hidden bg-no-repeat"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleLeave}
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: backgroundPosition,
            backgroundSize: backSize,
          }}
        >
          {/* <img
          className="image h-full w-full opacity-0"
          src={`${image}`}
          alt="img"
        /> */}
        </div>
      </div>
      <div className="flex items-center scroll-bar overflow-y-hidden  w-full">
        {vehicle?.images?.map((img, index) => {
          return (
            <button
              onClick={() => changeImage(index)}
              key={index}
              className="shrink-0 md:m-1.5 bg-no-repeat m-1 h-20 w-20 overflow-hidden rounded-lg dark:hover:ring-2 dark:ring-1 ring-white shadow hover:shadow-md "
            >
              <img className=" h-full w-full" src={`${img}`} alt="img" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSection;
