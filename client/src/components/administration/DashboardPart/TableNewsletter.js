import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItemNewsletter from './ItemNewsletter';
import AddNewsletterModal from './../Modal/AddNewsletterModal';
import RemoveNewsletterModal from './../Modal/RemoveNewsletterModal';

const TableNewsletter = () => {


    let [data, setData] = useState([])
    let [select, setSelect] = useState(null)

    let [addModal, setAddModal] = useState(false)
    let [removeModal, setRemoveModal] = useState(false)
    
    let [newItem, setNewItem] = useState(false)


    let fetchNewsletter = async () => {
        let resp = await fetch('http://127.0.0.1:8000/api/newsletter/', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            },
        })

        let data = await resp.json()

        if(resp.status === 200)
        {
            setData(data)
        }else{
            console.log(data)
        }

        if (newItem)
        {
            setNewItem(false)
        }

    }


    useEffect(() => {
        fetchNewsletter()
    }, [])

    useEffect(() => {

        fetchNewsletter()

    }, [newItem])




  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8">
        <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Les abonnées à la newsletter</h3>
        {/*<!-- Button Add Newsletter -->*/}
        <div className="flex w-full justify-end my-5">
            <button type="button" className="w-1/2 text-white bg-blue-900 hover:bg-blue-700 outline-none font-medium flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto" onClick={()=> setAddModal(true)}>
                <FontAwesomeIcon icon={faPlus} className="mr-1 h-5 w-6 text-lg"/>
                <span>Ajouter un E-mail</span>
            </button>
        </div>

        <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border border-gray-400">

                <thead className="border border-gray-400">
                    <tr >
                        <th
                            className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Nom d'utilisateur</th>
                        <th
                            className="px-24 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-center uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                            Adresse E-mail</th>
                        <th
                            className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-center uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                            Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-400">


                    {
                        data.map((item, index) => (
                            <ItemNewsletter key={index} item={item} setSelect={setSelect} setRemoveModal={setRemoveModal}/>
                        ))
                    }

                </tbody>
            </table>
        </div>

        {/* Add Newsletter User Modal */}
        {
            addModal && <AddNewsletterModal setAddModal={setAddModal} setNewItem={setNewItem}/>
        }

        {/* Remove Newsletter User Modal */}
        {
            removeModal && <RemoveNewsletterModal setData={setData} data={data} setRemoveModal={setRemoveModal} select={select}/>
        }


    </div>
  )
}

export default TableNewsletter;