import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginBaseAgent from './components/agent/LoginAgent/LoginBaseAgent';
import LoginAdmin from './components/administration/LoginAdmin';
import Error404 from './components/Error404';
import Home from './components/agent/Home';
import Dashboard from './components/administration/Dashboard';
import ContextProvider from './context/ContextProvider';
import TwoFactor from './components/TwoFactor';
import TwoFactorAdmin from './components/administration/TwoFactorAdmin';

import PrivateRouteAgent from './utils/PrivateRouteAgent';
import PrivateRouteAdmin from './utils/PrivateRouteAdmin';
import AuthFactorAgent from './utils/AuthFactorAgent';
import AuthFactorAdmin from './utils/AuthFactorAdmin';



const App = () => {


  return (
    <BrowserRouter>

      <ContextProvider>
          <Switch>
            <Route exact path="/" component={LoginBaseAgent}/>
            <AuthFactorAgent exact path="/twofactor" component={TwoFactor}/>
            <PrivateRouteAgent exact path="/home" component={Home}/>
            <Route exact path="/admin" component={LoginAdmin}/>
            <AuthFactorAdmin exact path="/twofactoradmin" component={TwoFactorAdmin}/>
            <PrivateRouteAdmin exact path="/dashboard" component={Dashboard} />
            <Route component={Error404}/>
          </Switch>
      </ContextProvider>

  </BrowserRouter>
  );
}

export default App;
