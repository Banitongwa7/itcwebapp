import React, { useState, Fragment} from 'react';
import CardStat from './../DashboardPart/CardStat';
import OfferStat from './../DashboardPart/OfferStat';
import TableNewsletter from './../DashboardPart/TableNewsletter';

const BasePart = () => {

  // useState for update CardStat when admin add or remove something in OfferStat Component
  let [update, setUpdate] = useState(false)


  return (
    <Fragment>
    <CardStat update={update} setUpdate={setUpdate}/>
    <OfferStat setUpdate={setUpdate} update={update}/>
    <TableNewsletter />
    </Fragment>
  )
}

export default BasePart;