import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faBriefcase, faDiagramProject } from '@fortawesome/free-solid-svg-icons';

const CardStat = () => {




  return (
    <section className="m-4">
        <div className="grid container grid-cols-1 md:grid-cols-3 gap-5">
            {/*<!-- Card 1 -->*/}
            <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">2,340</span>
                        <h3 className="text-base font-normal text-gray-500">Total des offres d'opportunités</h3>
                    </div>
                    <div className="flex justify-end flex-1">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-blue-500">
                            <FontAwesomeIcon icon={faChartColumn} />
                        </div>
                    </div>
                </div>
            </div>

            {/*<!-- Card 2 -->*/}
            <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">5,355</span>
                        <h3 className="text-base font-normal text-gray-500">Total des Missions</h3>
                    </div>
                    <div className="flex justify-end flex-1">
                        <div
                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-blue-500">
                            <FontAwesomeIcon icon={faBriefcase} />
                        </div>
                    </div>
                </div>
            </div>

            {/*<!-- Card 3 -->*/}
            <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">385</span>
                        <h3 className="text-base font-normal text-gray-500">Total des sites de scraping</h3>
                    </div>
                    <div className="flex justify-end flex-1">
                        <div
                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-blue-500">
                            <FontAwesomeIcon icon={faDiagramProject} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CardStat;