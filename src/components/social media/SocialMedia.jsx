import React, { useRef } from "react";
import "./social.css";
import mail from "./Image/mail_png.png";
import face from "./Image/facebo.png";
import microsoft from "./Image/microsoft.png";
import google from "./Image/google.png";
import twitter from "./Image/twiter_png.png";
// import twitter from "./Image/twitter_3d.png";
import telegram from "./Image/telegram_png.png";
import linkedIN from "./Image/linkedin_png.png";
// import linkedIN from "./Image/linkedin_3d.png";
import insta from "./Image/insta_icon.png";
// import insta from "./Image/insta_3d.png";
import youtube from "./Image/youtube_png.png";
// import youtube from "./Image/youtube_3d.png";

export const SocialMedia = () => {
  const animatRefs = useRef([]);

  const toggleAnimation = () => {
    animatRefs.current.forEach(box => {
      if (box) {
        box.classList.toggle('pause-animation');
      }
    });
  };

  return (
    <div className="media-div" title="Click to Pause">
      <div
        // className="d1 animat bg-[#9FFB17]/80 dark:bg-[#060665]/30 bg-[radial-gradient(circle_farthest-side,rgba(255,128,182,.15),rgba(255,255,255,0))]"
        className="d1 animat from-green-400 to-[#9FFB17]  bg-gradient-to-tr dark:from-blue-800/70 dark:to-fuchsia-900/50 shadow-cyan-500 "
        onClick={toggleAnimation}
        ref={el => el && animatRefs.current.push(el)}
      >
        <div className="box b1 animat " ref={el => el && animatRefs.current.push(el)}>
          <a href="/">
            <img src={microsoft} alt="google"  />
          </a>
        </div>

        <div className="box b2 animat" ref={el => el && animatRefs.current.push(el)}>
          <a href="/">
            <img src={mail} alt="mail" />
          </a>
        </div>

        <div className="d2 animat" ref={el => el && animatRefs.current.push(el)}>
          <div className="inb1 inbox animat" ref={el => el && animatRefs.current.push(el)}>
            <a href="/" target="_blank">
              <img src={twitter} alt="twitter" />
            </a>
          </div>
          <div className="inb2 inbox animat" ref={el => el && animatRefs.current.push(el)}>
            <a href="/" target="_blank">
              <img src={face} alt="telegram" />
            </a>
          </div>
          <div className="inb3 inbox animat" ref={el => el && animatRefs.current.push(el)}>
            <a href="/" target="_blank">
              <img src={telegram} alt="telegram" />
            </a>
          </div>
          <div className="inb4 inbox animat" ref={el => el && animatRefs.current.push(el)}>
            <a href="/" target="_blank">
              <img src={linkedIN} alt="linkedIN" />
            </a>
          </div>
        </div>

        <div className="box b3 animat" ref={el => el && animatRefs.current.push(el)}>
          <a
            href="https://www.youtube.com/channel/UCZK6B5ySo3mToqgNt1ar_XA"
            target="_blank"
            rel="noreferrer"
          >
            <img src={youtube} alt="youtube" className="" />
          </a>
        </div>

        <div className="box b4 animat" ref={el => el && animatRefs.current.push(el)}>
          <a href="/" target="_blank">
            <img src={insta} alt="insta" />
          </a>
        </div>
      </div>
    </div>
  );
};
