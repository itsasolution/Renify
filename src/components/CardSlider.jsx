import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarCard from "./CarCard";
import axios from "axios";

const CardSlider = () => {
  const [vehicles, setVehicles] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    swipeToSlide: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getitems = async () => {
      try {
        const res = await axios.get("http://localhost:4000/vehicles");
        // console.log(res.data);
        setVehicles(res.data);
      } catch(err) {
        console.log("error:",err);
      }
    };
    getitems();
  }, []);

  return (
    <>
      <Slider {...settings} className="m-10 ">
        {vehicles.map((data) => (
          <CarCard key={data?._id} data={data} />
        ))}
      </Slider>
      
      {/* <Slider {...settings}>
        <div className="py-4 px-3 bg-slate-300">
          <p className="section__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            magni explicabo molestias recusandae repudiandae, dolor, sapiente
            placeat
          </p>
          <div className="mt-3 flex items-center gap-4">
            <img src="./banner.jpg" alt="" className="w-52 h-52 rounded-full" />

            <div>
              <h6 className="mb-0 mt-3">Jhon Doe</h6>
              <p className="section__description">Customer</p>
            </div>
          </div>
        </div>
        <div className="py-4 px-3">
          <p className="section__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            magni explicabo molestias recusandae repudiandae, dolor, sapiente
            placeat
          </p>
          <div className="mt-3 flex items-center gap-4">
            <img src="./banner.jpg" alt="" className="w-52 h-52 rounded-full" />

            <div>
              <h6 className="mb-0 mt-3">Jhon Doe</h6>
              <p className="section__description">Customer</p>
            </div>
          </div>
        </div>
        <div className="py-4 px-3">
          <p className="section__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            magni explicabo molestias recusandae repudiandae, dolor, sapiente
            placeat
          </p>
          <div className="mt-3 flex-col items-center gap-4">
            <img src="./banner.jpg" alt="" className="w-52 h-52 rounded-full" />

            <div>
              <h6 className="mb-0 mt-3">Jhon Doe</h6>
              <p className="section__description">Customer</p>
            </div>
          </div>
        </div>
      </Slider> */}
    </>
  );
};

export default CardSlider;
