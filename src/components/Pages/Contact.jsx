import React from "react";
import { SocialMedia } from "../social media/SocialMedia";
// import { ProductDetail } from '../testing/ProductDetail'

export const Contact = () => {
  return (
    <>
      <h1 className="text-center text-2xl mt-5 font-semibold">
        <span className="flex items-center gap-2 justify-center">
          {/* mail */}
          <lord-icon
            src="https://cdn.lordicon.com/tmqaflqo.json"
            trigger="loop"
            delay="1500"
            state="in-assembly"
            colors="primary:#104891,secondary:#ebe6ef,tertiary:#66a1ee"
            style={{ width: "50px", height: "50px" }}
          ></lord-icon>
          Contact Us
        </span>
      </h1>
      <div className="opacityanime flex flex-col md:flex-row justify-around gap-10 h-[calc(100vh-55px)] p-2 items-center">
        {/* <ProductDetail/> */}

        <div className="h-[400px]">
          <img src="./social media.png" className="h-full " alt="" />
        </div>
        <SocialMedia />
      </div>
    </>
  );
};
