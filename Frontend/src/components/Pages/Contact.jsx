import React from "react";
import { SocialMedia } from "../social media/SocialMedia";
import FeedBackForm from "../FormTemplate/FeedBackForm";

export const Contact = () => {
  return (
    <>

      <h1 className="flex items-center gap-2 justify-center text-2xl my-5 font-semibold ">
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


      <div className="opacityanime overflow-hidden flex flex-col-reverse my-6 py-5 md:my-2 md:flex-row items-center justify-around gap-10 md:h-[calc(100vh-55px)] ">
      <FeedBackForm />
        <SocialMedia />
        {/* <div className="md:h-[400px] h-[300px] lg:h-[60%]">
          <img src="./social media.png" className="h-full " alt="" />
        </div> */}

      </div>

    </>
  );
};
