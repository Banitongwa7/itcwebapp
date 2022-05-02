import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from './../context/Context';

function AuthFactorAdmin({children, ...rest}) {
    let {interim} = useContext(Context)
    return (
    <Route {...rest}>
        {interim ? (children) : (<Redirect to="/admin"/>) }
    </Route>
  )
}

export default AuthFactorAdmin;