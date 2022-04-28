import React from 'react';
import SearchOffer from './SearchOffer';
import ItemOffer from './ItemOffer';
import Pagination from './../Pagination/Pagination';

const Offer = () => {
    return (
            <div>
            <section className="antialiased font-sans my-5">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="py-8">

                            {/* Filter and search */}
                            <SearchOffer />

                            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full overflow-hidden">
                                    <div className="min-w-full">
                                        <div>
                                        {/* Offer Item */}
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>
                                        <ItemOffer/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Pagination />

            </div>
          )
}

export default Offer;