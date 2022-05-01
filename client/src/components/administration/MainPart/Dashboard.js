import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeaderAdmin from './../Header/HeaderAdmin';
import FooterSimple from '../Footer/FooterSimple';
import BasePart from './BasePart';
import OfferOpportunity from '../Offer/OfferOpportunity';
import MissionAdmin from './../Mission/MissionAdmin';
import AgentAccounts from '../AccountAgent/AgentAccounts';
import Error404 from '../../Error404';
import ProfileAdmin from './../Profile/ProfileAdmin';
import Credential from './../Credentials/Credential';
import Opportunity from './../Opportunity/Opportunity';
import ContextProvider from './../../../context/ContextProvider';

const Dashboard = ({match}) => {  
  return (
    <div className="flex flex-col h-screen justify-between">

    <BrowserRouter>
        <HeaderAdmin />
        <ContextProvider>
          <Switch>
            <Route exact path={match.url} component={BasePart} />
            <Route exact path={`${match.url}/opportunity`} component={OfferOpportunity}/>
            <Route exact path={`${match.url}/mission`} component={MissionAdmin}/>
            <Route exact path={`${match.url}/allagent`} component={AgentAccounts}/>
            <Route exact path={`${match.url}/credential`} component={Credential}/>
            <Route exact path={`${match.url}/qualification`} component={Opportunity}/>
            <Route exact path={`${match.url}/settings`} component={ProfileAdmin}/>
            <Route component={Error404} />
          </Switch>
        </ContextProvider>

        <FooterSimple />

    </BrowserRouter>

    </div>
  )
}


export default Dashboard;