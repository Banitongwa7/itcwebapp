import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const RemoveWebsiteModal = ({setRemoveWebsiteModal, select, data, setData, setUpdate, update}) => {

    // archive website in database
    let HandleRemove = async (url) => {
    
        let formdata = new FormData()
    
        formdata.append('url', url)
    
        let resp = await fetch('http://127.0.0.1:8000/api/archivewebsite/', {
            method: 'POST',
            body:formdata
        })
    
        let response = await resp.json()
        
        if (response === 200)
        {
            setRemoveWebsiteModal(false)
            setData(data.filter((i) => i.url !== url))
            setUpdate(update = true)
        }
    
      }

  return (
    <div className="bg-gray-900 bg-opacity-50 fixed overflow-x-hidden overflow-y-auto inset-0 z-50 justify-center items-center h-modal sm:h-full" id="delete-user-modal">
        <div className="mt-52 m-auto w-full max-w-2xl h-full md:h-auto">
            {/*<!-- Modal content -->*/}
            <div className="bg-white rounded-lg shadow relative">
                {/*<!-- Modal header -->*/}
                <div className="flex justify-end p-2">
                    <button type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => {setRemoveWebsiteModal(false)}}>
                        <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-gray-900 text-lg" />
                    </button>
                </div>
                {/*<!-- Modal body -->*/}
                <div className="p-6 pt-0 text-center">
                    <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Voulez-vous vraiment supprimer ce site de scraping ?</h3>
                    <Link to="#" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2" onClick={() => HandleRemove(select.url)}>
                        Oui, Je suis sûre
                    </Link>
                    <Link to="#" className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" onClick={() => {setRemoveWebsiteModal(false)}}>
                        Non, annuler
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RemoveWebsiteModal;