import React from "react";
import { SocialMedia } from "../social media/SocialMedia";

export const Contact = () => {
  return (
    <>
      <h1 className="flex items-center gap-2 justify-center text-2xl mt-5 font-semibold ">
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
      </h1>
      <div className="opacityanime overflow-hidden flex flex-col-reverse my-6 md:my-0 md:flex-row justify-around gap-10 h-[calc(100vh-55px)] p-2 items-center">
        <div className="md:h-[400px] h-[300px] lg:h-[60%]">
          <img src="./social media.png" className="h-full " alt="" />
        </div>

        <SocialMedia />
      </div>
    </>
  );
};
