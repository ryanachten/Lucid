import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from '../components/HomePage';

const AppRouter = () => (
  <BrowserRouter>
    <div id="router--container">
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route component={HomePage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
