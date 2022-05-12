import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from './../context/Context';

const PrivateRouteAdmin = ({children, ...rest}) => {
    let {admin} = useContext(Context)
    return (
    <Route {...rest}>
        {!admin ? (<Redirect to="/admin"/>) : children}
    </Route>
  )
}

export default PrivateRouteAdmin;