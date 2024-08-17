import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarCard from "./CarCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/context";

const CardSlider = () => {
  const [vehicles, setVehicles] = useState([]);
  const { url, setLoader } = useContext(UserContext);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    swipeToSlide: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
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

  const getitems = async () => {
    try {
      const res = await axios.get(`${url}/vehicles?type=all?availability=true`);
      // console.log(res.data);
      setVehicles(res.data.results);
    } catch (err) {
      console.log("error:", err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getitems();
  }, [url]);

  return (
    <>
      <Slider {...settings} className="m-10 ">
        {vehicles?.map((data) => (
          <Link to={`/vehicledetails/${data?._id}`} key={data?._id}>
            <CarCard data={data} />
          </Link>
        ))}
      </Slider>
    </>
  );
};

export default CardSlider;
