import React from "react";
import "./social.css";
import mail from "./Image/mail_png.png";
import face from "./Image/facebo.png";
import twitter from "./Image/twiter_png.png";
import telegram from "./Image/telegram_png.png";
import linkedIN from "./Image/linkedin_png.png";
import insta from "./Image/insta_icon.png";
import youtube from "./Image/youtube_png.png";

export const SocialMedia = () => {
  return (
    <div className="media-div ">
      <div className="d1 animat">
        <div className="box b1 animat">
          <a href="/">
            <img src={face} alt="face" />
          </a>
        </div>

        <div className="box b2 animat">
          <a href="/">
            <img src={mail} alt="mail" />
          </a>
        </div>

        <div className="d2 animat ">
          <div className="inb1 inbox animat">
            <a href="" target="_blank">
              <img src={twitter} />
            </a>
          </div>
          <div className="inb2 inbox animat">
            <a href="" target="_blank">
              <img src={telegram} />
            </a>
          </div>
          <div className="inb3 inbox animat">
            <a href="" target="_blank">
              <img src={telegram} />
            </a>
          </div>
          <div className="inb4 inbox animat">
            <a href="" target="_blank">
              <img src={linkedIN} />
            </a>
          </div>
        </div>

        <div className="box b3 animat">
          <a
            href="https://www.youtube.com/channel/UCZK6B5ySo3mToqgNt1ar_XA"
            target="_blank"
            rel="noreferrer"
          >
            <img src={youtube} alt="you" />
          </a>
        </div>

        <div className="box b4 animat">
          <a href="" target="_blank">
            <img src={insta} alt="insta" />
          </a>
        </div>
      </div>
    </div>
  );
};
