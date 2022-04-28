import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginAgent from '../Login/LoginAgent';
import ChangePass from '../Login/ChangePass';
import ConfirmPass from '../Login/ConfirmPass';
import Error404 from '../../Error404';


const LoginBaseAgent = ({match}) => {


  return (
    <BrowserRouter>

        <Switch>
          <Route exact path={match.url} component={LoginAgent} />
          <Route exact path="/changepassword" component={ChangePass}/>
          <Route exact path="/confirmpassword" component={ConfirmPass}/>
          <Route component={Error404} />
        </Switch>

    </BrowserRouter>
  )
}

export default LoginBaseAgent;