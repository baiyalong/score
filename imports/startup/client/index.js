import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Root from '../../ui/Root.js';

Meteor.startup(() => {
  render(<Root />, document.getElementById('render-target'));
});