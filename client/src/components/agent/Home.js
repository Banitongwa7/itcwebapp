import React from 'react';
import HeaderAgent from './HeaderAgent';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Offer from './Offer';
import MissionAgent from './MissionAgent';
import Error404 from '../Error404';
import Footer from '../Footer';

import ProfileAgent from './ProfileAgent';

const Home = ({match}) => {


    return (
      <div className="flex flex-col h-screen justify-between">
       <BrowserRouter>
      <HeaderAgent />

          <Switch>
            <Route exact path={match.url} component={Offer} />
            <Route exact path={`${match.url}/mission`} component={MissionAgent}/>
            <Route exact path={`${match.url}/settings`} component={ProfileAgent}/>
            <Route component={Error404} />
          </Switch>


        <Footer />
      </BrowserRouter>
      </div>
    );

}

export default Home;