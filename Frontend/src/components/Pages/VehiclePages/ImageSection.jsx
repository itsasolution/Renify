import React, { useEffect, useState } from "react";

const ImageSection = ({ vehicle, setImage, image }) => {
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const [backSize, setbackSize] = useState("cover");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleLeave = () => {
    setBackgroundPosition(`center`);
    setbackSize("cover");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex z-10 gap-1 bg-gray-100 shadow-md rounded-md dark:bg-gray-900/90 md:gap-1 flex-col">
      <div
        className="image-container max-w-[700px] lg:max-w-full lg:max-h-full h-80 max-h-[700px] md:min-h-[500px] xl:min-h-[65vh] w-full rounded-xl shadow-md p-1 overflow-hidden bg-no-repeat"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        onClick={openModal}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: backgroundPosition,
          backgroundSize: backSize,
          cursor: "zoom-in",
        }}
      ></div>

      <div className="flex items-center scroll-bar overflow-y-hidden w-full">
        {vehicle?.images?.map((img, index) => {
          return (
            <button
              onClick={() => changeImage(index)}
              key={index}
              className="shrink-0 md:m-1.5 bg-no-repeat m-1 h-20 w-20 overflow-hidden rounded-lg dark:hover:ring-2 dark:ring-1 ring-white shadow hover:shadow-md"
            >
              <img className="h-full w-full" src={`${img}`} alt="img" />
            </button>
          );
        })}
      </div>

      {/* Modal for full-size image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              className="rounded-lg max-h-[100vh] max-w-[100vw]"
              src={image}
              alt="Full-size"
            />
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 m-2 text-white text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSection;
