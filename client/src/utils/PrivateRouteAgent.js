import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from './../context/Context';

const PrivateRouteAgent = ({children, ...rest}) => {
    let {agent, authTwoFactor} = useContext(Context)
    return (
    <Route {...rest}>
        {authTwoFactor && (!agent ? (<Redirect to="/"/>) : children)}
    </Route>
  )
}

export default PrivateRouteAgent;