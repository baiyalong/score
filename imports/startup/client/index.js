
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from './routes.js';
import { Session } from 'meteor/session';
import status from './status';


Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
  Session.set('Info', undefined)
  status()
});