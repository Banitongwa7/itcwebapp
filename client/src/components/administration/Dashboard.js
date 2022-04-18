import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeaderAdmin from './PartDashboard/HeaderAdmin';
import FooterSimple from './FooterSimple';
import BasePart from './PartDashboard/BasePart';
import OfferOpportunity from './OfferOpportunity';
import MissionAgent from './../agent/MissionAgent';
import AgentAccounts from './AgentAccounts';
import Error404 from './../Error404';
import ProfileAdmin from './ProfileAdmin';

const Dashboard = ({match}) => {
  return (
    <div className="flex flex-col h-screen justify-between">

    <BrowserRouter>
        <HeaderAdmin />

        <Switch>
          <Route exact path={match.url} component={BasePart} />
          <Route exact path={`${match.url}/opportunity`} component={OfferOpportunity}/>
          <Route exact path={`${match.url}/mission`} component={MissionAgent}/>
          <Route exact path={`${match.url}/allagent`} component={AgentAccounts}/>
          <Route exact path={`${match.url}/settings`} component={ProfileAdmin}/>
          <Route component={Error404} />
        </Switch>

        <FooterSimple />

    </BrowserRouter>

    </div>
  )
}


export default Dashboard;