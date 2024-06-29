import React from "react";
import { SocialMedia } from "../social media/SocialMedia";
// import { ProductDetail } from '../testing/ProductDetail'

export const Contact = () => {
  return (
    <>
      <h1 className="text-center text-2xl mt-5 font-semibold">Contact Us</h1>
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
