import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from './../context/Context';

const PrivateRouteAgent = ({children, ...rest}) => {
    let {agent} = useContext(Context)
    return (
    <Route {...rest}>
        {!agent ? (<Redirect to="/login"/>) : children }
    </Route>
  )
}

export default PrivateRouteAgent;