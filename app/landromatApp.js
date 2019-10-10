"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";

import MailchimpSubscribe from "react-mailchimp-subscribe";


const CustomForm = ({ status, message, onValidated }) => {
  let email, name, phone;
  const submit = () =>
    email &&
    name &&
    phone &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      FNAME: name.value,
      PHONE: phone.value
    });

  const submitOnEnter = (event) =>
    email &&
    name &&
    phone &&
    email.value.indexOf("@") > -1 &&
    event.keyCode === 13 &&
    onValidated({
      EMAIL: email.value,
      FNAME: name.value,
      PHONE: phone.value
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

  const hasNumber = function(myString) {
    return /\d/.test(myString);
  }

  return (
    <div className="subscribe-form">
      {status === "sending" && (
        <div
          className="status">
          enviando datos/sending data...
        </div>
      )}
      {status === "error" && (
        <div
          className="status"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          className="status status-success"
        >
          <div>Gracias<br/>Revisar tu email<br/>Thanks<br/>Check your e-mail</div>
        </div>
      )}
      <input
        ref={node => (name = node)}
        className={status && status === "error" ? "error" : "" }
        onChange={clearError}
        type="name"
        placeholder="Nombre/Name"
        onKeyUp={submitOnEnter}
      />
      <input
        ref={node => (email = node)}
        className={status && status === "error" ? "error" : "" }
        onChange={clearError}
        type="email"
        placeholder="E-mail"
        onKeyUp={submitOnEnter}
      />
      <input
        ref={node => (phone = node)}
        className={status && status === "error" ? "error" : "" }
        onChange={clearError}
        type="number"
        placeholder="Numero de teléfono/Phone number"
        onKeyUp={submitOnEnter}
      />
      <input
        className={status && status === "error" ? "error" : "" }
        onChange={clearError}
        type="checkbox"
        placeholder="Phone number"
        onKeyUp={submitOnEnter} />
      <label>Registro via email/I accept e-mail subscription</label>
      <button onClick={submit}>Send</button>
    </div>
  );
};

export default class Landromat extends Component {
  render() {
    const url = "https://tuta.us20.list-manage.com/subscribe/post?u=e2bb4f95dc2191d6b7a48a9e0&amp;id=ce3878d03f";
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
