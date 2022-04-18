import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from './../context/Context';

function AuthFactorAgent({children, ...rest}) {
    let {authTwoFactor} = useContext(Context)
    return (
    <Route {...rest}>
        {authTwoFactor ? (children) : (<Redirect to="/"/>) }
    </Route>
  )
}

export default AuthFactorAgent;