import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginBaseAgent from './components/agent/MainPart/LoginBaseAgent';
import LoginAdmin from './components/administration/Login/LoginAdmin';
import Error404 from './components/Error404';
import Home from './components/agent/MainPart/Home';
import Dashboard from './components/administration/MainPart/Dashboard';
import ContextProvider from './context/ContextProvider';

import PrivateRouteAgent from './utils/PrivateRouteAgent';
import PrivateRouteAdmin from './utils/PrivateRouteAdmin';



const App = () => {


  return (
    <BrowserRouter>

      <ContextProvider>
          <Switch>
            {/*Route for Agent*/}
            <Route exact path="/" component={LoginBaseAgent}/>
            <PrivateRouteAgent exact path="/home" component={Home}/>

            {/*Route for Admin*/}
            <Route exact path="/admin" component={LoginAdmin}/>
            <PrivateRouteAdmin exact path="/dashboard" component={Dashboard} />
            <Route component={Error404}/>
          </Switch>
      </ContextProvider>

  </BrowserRouter>
  );
}

export default App;
