import React, { Fragment } from 'react'
import CardStat from './CardStat';
import OfferStat from './OfferStat';
import TableNewsletter from './TableNewsletter';

const BasePart = () => {
  return (
    <Fragment>
    <CardStat />
    <OfferStat />
    <TableNewsletter />
    </Fragment>
  )
}

export default BasePart;