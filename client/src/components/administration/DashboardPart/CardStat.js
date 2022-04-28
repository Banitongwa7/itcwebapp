import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faBriefcase, faDiagramProject } from '@fortawesome/free-solid-svg-icons';

const CardStat = ({update, setUpdate}) => {


    let [totalOffer, setTotalOffer] = useState(0)
    let [totalMission, setTotalMission] = useState(0)
    let [totalSite, setTotalSite] = useState(0)

    // GET statistique about offer, mission and number of website
    let dataBackend = async ()=> {
        let resp = await fetch('http://127.0.0.1:8000/api/statistique/', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            },
        })
        let data = await resp.json()
        if(resp.status === 200)
        {
            setTotalOffer(data.statoffre)
            setTotalMission(data.statmission)
            setTotalSite(data.statsite)
        }else{
            console.log(data)
        }


        if (update){
            setUpdate(false)
        }
    }



    useEffect(() => {
        let eighthour = 1000 * 60 * 60 * 8
       let intervalID = setInterval(() => {
            dataBackend()
        }, eighthour)

        dataBackend()

        return () => clearInterval(intervalID);

    }, [])

    useEffect(() => {

        dataBackend()

    }, [update])


  return (
    <section className="m-4">
        <div className="grid container grid-cols-1 md:grid-cols-3 gap-5">
            {/*<!-- Card 1 -->*/}
            <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{totalOffer}</span>
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
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{totalMission}</span>
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
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{totalSite}</span>
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