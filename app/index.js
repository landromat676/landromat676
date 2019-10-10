'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import LandromatApp from './landromatApp';

import './assets/stylesheets/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  var landromatApp = document.querySelector('#sloy-app');

  if (LandromatApp) {
    ReactDOM.render(
      <LandromatApp />,
      landromatApp
    );
  }
});
