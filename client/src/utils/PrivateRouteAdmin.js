import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from './../context/Context';

const PrivateRouteAdmin = ({children, ...rest}) => {
    let {admin, authTwoFactor} = useContext(Context)
    return (
    <Route {...rest}>
        {authTwoFactor ? (!admin ? (<Redirect to="/admin"/>) : children ) : (<Redirect to="/admin"/>) }
    </Route>
  )
}

export default PrivateRouteAdmin;