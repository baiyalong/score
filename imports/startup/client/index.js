
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { renderRoutes } from './routes.js';
import { Session } from 'meteor/session';

import Wx from '../../ui/Wx';


Meteor.startup(() => {
  if (isWx())
    render(<Wx />, document.getElementById('render-target'));
  else
    render(renderRoutes(), document.getElementById('render-target'));
  Session.set('Info', undefined)
});



function isWx() {
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == 'micromessenger';
}