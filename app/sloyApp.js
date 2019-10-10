"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";

import MailchimpSubscribe from "react-mailchimp-subscribe";


const CustomForm = ({ status, message, onValidated }) => {
  let email;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value
    });

  const submitOnEnter = (event) =>
    email &&
    email.value.indexOf("@") > -1 &&
    event.keyCode === 13 &&
    onValidated({
      EMAIL: email.value
    });

  const clearError = function() {
    if (status && status === "error") {
      const status = document.querySelector('.status');
      const input = document.querySelector('input');
      input.classList.remove("error");
      status.style.display = "none";
    }
  }

  if (message && message.includes("0 - The domain portion of the email address is invalid")) {
    message = "Не похоже на e-mail"
  }

  if (message && message.includes("0 - The username portion of the email address is invalid")) {
    message = "Не похоже на e-mail"
  }

  if (message && message.includes("уже подписан")) {
    message = "такой e-mail уже подписан"
  }

  const activateClosePanel = function() {
    const video = document.querySelector('.video-bg');
    const overlay = document.querySelector('.overlay');
    video.onclick = function() {
      document.querySelector('.status-success').classList.add("hide")
    }
    overlay.onclick = function() {
      document.querySelector('.status-success').classList.add("hide")
    }
  }

  return (
    <div
      style={{
        padding: "0 20px",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        marginBottom: 30,
      }}
    >
      {status === "sending" && (
        <div
          className="status"
          style={{ color: "white", position: "absolute", fontSize: "0.66rem", bottom: -20, letterSpacing: ".1rem" }}>
          отправка данных...
        </div>
      )}
      {status === "error" && (
        <div
          className="status"
          style={{ color: "#FF4F23", position: "absolute", fontSize: "0.66rem", bottom: -20, letterSpacing: ".1rem" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && activateClosePanel()}
      {status === "success" && (
        <div
          className="status status-success"
          style={{ color: "white", position: "fixed", zIndex: "99", background: "#181818", fontSize: "1rem", bottom: 0, left: -1, right: -1, letterSpacing: ".1rem", padding: 20, paddingBottom: 40 }}
        >
          <div style={{ marginBottom: 30, paddingRight: 80 }}>Принято. <br/>Одно из первых приглашений — твоё!</div>
          <div style={{ marginBottom: 15 }}>Следи за новостями</div>
          <div style={{ position: "absolute", top: 20, right: 20, background: "#5AE800", fontSize: "2em", padding: 5, height: 56, width: 56, border: 0, borderRadius: 100, outline: "none", display: "flex", alignItems: "center", justifyContent: "center", }}>
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path className="checkmark__check" strokeWidth="4" stroke="#181818" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
          </div>
          <a
            className="social-link"
            href="#">
            <img src="images/ig.svg" />
            <span>INSTASLOY</span>
          </a>
          <a
            className="social-link"
            href="#">
            <img src="images/tg.svg" />
            <span>SLOYGRAM</span>
          </a>
          <a
            className="social-link"
            href="#">
            <img src="images/yt.svg" />
            <span>YOUSLOY</span>
          </a>
        </div>
      )}
      <input
        style={{ fontSize: "1rem", padding: "10px 25px", width: "75%", marginRight: 15, height: 56, border: 0, borderRadius: 100, marginLeft: -5, textTransform: "uppercase", letterSpacing: "0.06rem", fontWeight: 600, outline: "none", boxShadow: "none" }}
        ref={node => (email = node)}
        className={status && status === "error" ? "error" : "" }
        onChange={clearError}
        type="email"
        placeholder="E-mail"
        onKeyUp={submitOnEnter}
      />
      <button style={{ fontSize: "2em", padding: 5, height: 56, width: 56, border: 0, borderRadius: 100, outline: "none" }} onClick={submit}>
        <img style={{ marginTop: 3, cursor: "pointer", width: 35, height: 38 }} src="images/submit_icon.svg" />
      </button>
    </div>
  );
};

export default class SloyApp extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     is2Videos: window.innerWidth/window.innerHeight > 1.125,
  //     is3Videos: window.innerWidth/window.innerHeight > 1.6875,
  //   }
  // }

  componentDidMount() {
    const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (iOS) { const video = document.querySelector('html').classList.add("iphone"); }
    window.onresize = this.reportWindowSize.bind(this);
    this.reportWindowSize();
  }

  reportWindowSize() {
    const VideosPropotion1 = 0.5625;
    const VideosPropotion2 = 1.125;
    const VideosPropotion3 = 1.6875;
    const video = document.querySelector('video');
    const textWrapper = document.querySelector('.text-wrapper');
    const windowPropotions = window.innerWidth/window.innerHeight;

    if (window.innerWidth < 767 && video.src.includes("landing_1.mp4")) {
      if (windowPropotions < VideosPropotion1) {
        video.style.height = "100%";
        video.style.width = "auto";
        textWrapper.style.width = "100%";
        textWrapper.style.left = "0";
        textWrapper.style.transform = "translateX(0)";
        textWrapper.style.webkitTransform = "translateX(0)";
      } else {
        video.style.height = "auto";
        video.style.width = "100%";
        textWrapper.style.width = "100%";
        textWrapper.style.left = "0";
        textWrapper.style.transform = "translateX(0)";
        textWrapper.style.webkitTransform = "translateX(0)";
      }
      return;
    }

    if (window.innerWidth < 767) {
      video.src = "videos/landing_1.mp4";
    }

    if (window.innerWidth > 1200 && windowPropotions > VideosPropotion3 && !video.src.includes("landing_3.mp4")) {
      video.src = "videos/landing_3.mp4";
      video.style.height = "auto";
      video.style.width = "100%";
      textWrapper.style.width = "33.3%";
      textWrapper.style.left = "50%";
      textWrapper.style.transform = "translateX(-50%)";
      textWrapper.style.webkitTransform = "translateX(-50%)";
    } else if (window.innerWidth > 1200 && windowPropotions > VideosPropotion3) {
      video.style.height = "auto";
      video.style.width = "100%";
    }

    if (window.innerWidth > 767 && windowPropotions < VideosPropotion3 && !video.src.includes("landing_2.mp4")) {
      video.src = "videos/landing_2.mp4";
      textWrapper.style.width = "50%";
      textWrapper.style.left = "0";
      textWrapper.style.transform = "translateX(0)";
      textWrapper.style.webkitTransform = "translateX(0)";

      if (windowPropotions < VideosPropotion2) {
        video.style.height = "100%";
        video.style.width = "auto";
      } else {
        video.style.height = "auto";
        video.style.width = "100%";
      }
    } else if (window.innerWidth > 767 && windowPropotions < VideosPropotion3) {
      textWrapper.style.width = "50%";
      textWrapper.style.left = "0";
      textWrapper.style.transform = "translateX(0)";
      textWrapper.style.webkitTransform = "translateX(0)";

      if (windowPropotions < VideosPropotion2) {
        video.style.height = "100%";
        video.style.width = "auto";
      } else {
        video.style.height = "auto";
        video.style.width = "100%";
      }
    }
  }

  render() {
    const url = "//yandex.us20.list-manage.com/subscribe/post?u=aeeaa9f0d658a7d0ff40bad43&amp;id=437e6bd013";
    return (
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <div>
            <MailchimpSubscribe
              url={url}
              render={({ subscribe, status, message }) => (
                <CustomForm
                  status={status}
                  message={message}
                  onValidated={formData => subscribe(formData)}
                />
              )}
            />
          </div>
        )}
      />
    );
  }
}
