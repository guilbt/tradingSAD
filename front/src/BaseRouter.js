import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import React from 'react';
import URL_PATTERNS from './urlPatterns';
import LoginPage from './pages/Login.page';
import { RoutedPagePropTypes } from './helpers/defaultPropTypes';
import MainRouter from './modules/main/MainRouter';

function BaseRouter() {
  return (
    <Switch>
      <Route
        path={URL_PATTERNS.LOGIN}
        component={LoginPage}
      />
      <Route
        path={URL_PATTERNS.BASE}
        component={MainRouter}
      />
      <Redirect to={URL_PATTERNS.LOGIN} />
    </Switch>
  );
}

BaseRouter.propTypes = RoutedPagePropTypes;

export default BaseRouter;
