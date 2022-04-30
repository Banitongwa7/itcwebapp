import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddWebsiteModal from '../Modal/AddWebsiteModal';
import ItemOfferStat from './ItemOfferStat';
import RemoveWebsiteModal from '../Modal/RemoveWebsiteModal';

const OfferStat = ({setUpdate, update}) => {

    let [data, setData] = useState([])
    let [select, setSelect] = useState(null)
    let [total, setTotal] = useState(0)

    let [addWebsiteModal, setAddWebsiteModal] = useState(false)
    let [removeWebsiteModal, setRemoveWebsiteModal] = useState(false)

    let [newItem, setNewItem] = useState(false)

    let fetchWebsite = async () => {
        let resp = await fetch('http://127.0.0.1:8000/api/website/', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            },
        })

        let data = await resp.json()

        if(resp.status === 200)
        {
            setData(data)

            // sum of all stat by site
            let nbr = 0
            data.map((item) => ( nbr = nbr + (item.number * 1)))

            setTotal(total = nbr)
        }else{
            console.log(data)
        }

        if (newItem)
        {
            setUpdate(update = true)
            setNewItem(false)
        }

    }


    useEffect(() => {
        fetchWebsite()
    }, [])


    useEffect(() => {

        fetchWebsite()

    }, [newItem])



  return (
    <section>
    <div>
        <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8">
            <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Statistique des offres par site</h3>

            {/*<!-- Button Add website -->*/}
            <div className="flex w-full justify-end my-5">
                <button type="button" className="w-1/2 text-white bg-blue-900 hover:bg-blue-700 outline-none font-medium flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto" onClick={()=>setAddWebsiteModal(true)}>
                    <FontAwesomeIcon icon={faPlus} className='mr-1 h-5 w-6 text-lg'/>
                    <span>Ajouter un site</span>
                </button>
            </div>

            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border border-gray-400">

                    <thead className="border border-gray-400">
                        <tr>
                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                Site web
                            </th>

                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-center uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                                Offre d'opportunitée
                            </th>

                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-center uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-400">

                    {
                        data.map((item, index) => (
                            <ItemOfferStat key={index} setAddWebsiteModal={setAddWebsiteModal} setRemoveWebsiteModal={setRemoveWebsiteModal} item={item} setSelect={setSelect} total={total}/>
                        ))
                    }


                    </tbody>
                </table>
            </div>
        </div>
    </div>

    {/* Add Website Modal */}

    {
        addWebsiteModal && <AddWebsiteModal setAddWebsiteModal={setAddWebsiteModal} setNewItem={setNewItem}/>
    }

    {/* Remove Website Modal */}

    {
        removeWebsiteModal && <RemoveWebsiteModal setRemoveWebsiteModal={setRemoveWebsiteModal} data={data} setData={setData} select={select} setUpdate={setUpdate} update={update}/>
    }


</section>
  )
}

export default OfferStat;