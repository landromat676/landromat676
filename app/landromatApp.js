"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";

import MailchimpSubscribe from "react-mailchimp-subscribe";


const CustomForm = ({ status, message, onValidated, isSubmitButtonDisabled, checkBox }) => {
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

  return (
    <div className="subscribe-form">
      <h1 className="slogan">Ingresar/Join Landromat.co</h1>
      {status === "sending" && (
        <div
          className="status-sending">
          Enviando informacion/Sending data...
        </div>
      )}
      {status === "error" && (
        <div
          className="status-error"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          className="status status-success"
        >
          <h1>Gracias<br/>Revisar tu email<br/>Thanks<br/>Check your e-mail</h1>
        </div>
      )}
      <input
        ref={node => (name = node)}
        className={status && status === "error" ? "error" : "" }
        onChange={clearError}
        type="name"
        placeholder="NOMBRE/NAME"
        onKeyUp={submitOnEnter}
      />
      <input
        ref={node => (email = node)}
        className={status && status === "error" ? "error" : "" }
        onChange={clearError}
        type="email"
        placeholder="E-MAIL"
        onKeyUp={submitOnEnter}
      />
      <input
        ref={node => (phone = node)}
        className={status && status === "error" ? "error" : "" }
        onChange={clearError}
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="NUMERO DE TELEÉFONO/PHONE NUMBER"
        onKeyUp={submitOnEnter}
      />
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          onClick={checkBox}
          name="isSubmitButtonDisabled"
        />
        <span></span>
        <label className="checkbox-label">Registro via email<br/>I accept e-mail subscription</label>
      </div>
      <div className="button-wrapper">
        <button disabled={isSubmitButtonDisabled} onClick={submit}>Send</button>
      </div>
    </div>
  );
};

export default class Landromat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitButtonDisabled: true,
    };
  }

  checkBox() {
    this.setState({
      isSubmitButtonDisabled: !this.state.isSubmitButtonDisabled,
    })
  }

  render() {
    const isSubmitButtonDisabled = this.state.isSubmitButtonDisabled;
    const checkBox = ::this.checkBox;
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
                  isSubmitButtonDisabled={isSubmitButtonDisabled}
                  checkBox={checkBox}
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
