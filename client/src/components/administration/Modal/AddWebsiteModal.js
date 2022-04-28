import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const AddWebsiteModal = ({setAddWebsiteModal, setNewItem}) => {

    let [message, setMessage] = useState('')


    // add website in database
    let AddWebsite = async (e) => {

        e.preventDefault();

        let formdata = new FormData()
    
        formdata.append('description', e.target.titlewebsite.value)
        formdata.append('url', e.target.linkurl.value)
    
        let resp = await fetch('http://127.0.0.1:8000/api/website/', {
            method: 'POST',
            body:formdata
        })

        let response = await resp.json()

        if (response === 200)
        {
          setNewItem(true)
          setAddWebsiteModal(false)
        }else{
            setMessage("Le site existe déjà")
        }
    
      }


  return (
    <div className="bg-gray-900 bg-opacity-50 fixed overflow-x-hidden overflow-y-auto inset-0 z-50 justify-center items-center h-modal sm:h-full">
        <div className="mt-52 m-auto w-full max-w-2xl h-full md:h-auto">
            {/*<!-- Modal content -->*/}
            <div className="bg-white rounded-lg shadow relative">
                {/*<!-- Modal header -->*/}
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold">
                        Ajouter un site de scraping
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setAddWebsiteModal(false)}>
                        <FontAwesomeIcon icon={faXmark} className='w-5 h-5 text-gray-900 text-lg' />
                    </button>
                </div>
                {/*
                <!-- Modal body -->*/}
                <div className="p-6 space-y-6">
                    <form method='post' onSubmit={AddWebsite}>
                        <div className="grid grid-cols-6 gap-6">

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="titlewebsite" className="text-sm font-medium text-gray-900 block mb-2">Titre du site web</label>
                                <input type="text" name="titlewebsite" id="titlewebsite" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5" required />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="linkurl" className="text-sm font-medium text-gray-900 block mb-2">Url du site</label>
                                <input type="url" name="linkurl" id="linkurl"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"
                                    required placeholder='Ex : https://www.example.com' title='Ex : https://www.example.com'/>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                {/*<!-- Afficher Message d'erreur -->*/}
                                <p className="text-xs italic text-red-500">{message}</p>
                            </div>

                        </div>

                        {/*<!-- Modal footer -->*/}
                        <div className="items-center p-6 border-gray-200 rounded-b">
                            <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Valider</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddWebsiteModal;