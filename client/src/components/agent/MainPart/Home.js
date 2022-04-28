import React from 'react';
import HeaderAgent from './../Header/HeaderAgent';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Offer from '../Offer/Offer';
import MissionAgent from './../Mission/MissionAgent';
import Error404 from './../../Error404';
import Footer from './../Footer/Footer';

import ProfileAgent from './../Profile/ProfileAgent';

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