import React, { useRef } from "react";
import "./social.css";
import mail from "./Image/mail_png.png";
import face from "./Image/facebo.png";
import twitter from "./Image/twiter_png.png";
import telegram from "./Image/telegram_png.png";
import linkedIN from "./Image/linkedin_png.png";
import insta from "./Image/insta_icon.png";
import youtube from "./Image/youtube_png.png";

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
        className="d1 animat bg-[#9FFB17] dark:bg-[#006AFF] dark:shad"
        onClick={toggleAnimation}
        ref={el => el && animatRefs.current.push(el)}
      >
        <div className="box b1 animat " ref={el => el && animatRefs.current.push(el)}>
          <a href="/">
            <img src={face} alt="face"  />
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
              <img src={telegram} alt="telegram" />
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
