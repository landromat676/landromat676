'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SloyApp from './sloyApp';

import './assets/stylesheets/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  var sloyApp = document.querySelector('#sloy-app');

  if (SloyApp) {
    ReactDOM.render(
      <SloyApp />,
      sloyApp
    );
  }
});
