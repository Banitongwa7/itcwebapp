import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



const AddMissionModal = ({setAddmodal, setNewItem, newItem}) => {

    let [description, setDescription] = useState("")
    let [message, setMessage] = useState('')


    // function add agent

    let addMission = async (e) => {
        e.preventDefault();
        if (description)
        {

            let formdata = new FormData();

            formdata.append('description', description)

            let resp = await fetch(`http://127.0.0.1:8000/api/mission/`, {
                method: 'POST',
                body:formdata
            })

            let data = await resp.json()

            if (data !== 200)
            {
                setMessage("Cette mission existe déjà");
            }else{
                setNewItem(newItem = true)
                setAddmodal(false)
            }
        }else{
            setMessage("Votre champ est vide");
        }
        
    }



  return (
    <div className="bg-gray-900 bg-opacity-50 fixed overflow-x-hidden overflow-y-auto inset-0 z-50 justify-center items-center h-modal sm:h-full">
        <div className="mt-52 m-auto w-full max-w-2xl h-full md:h-auto">
            {/*
            <!-- Modal content -->*/}
            <div className="bg-white rounded-lg shadow relative">
                {/*
                <!-- Modal header -->*/}
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold">
                        Ajouter une mission
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={(e) => setAddmodal(false)}>
                        <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-gray-900 text-lg" />
                    </button>
                </div>
                {/*<!-- Modal body -->*/}
                <div className="p-6 space-y-6">
                    <form method="post" onSubmit={addMission}>
                        <div className="grid">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="mission" className="text-sm font-medium text-gray-900 block mb-2">Description de la mission</label>
                                    <textarea className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:border-blue-200 focus:outline-none" id="mission" rows="3" placeholder="Saisir la mission" name="mission" onChange={(e)=>{setDescription(e.target.value)}} required></textarea>
                            </div>
                            {/*<!-- Afficher Message d'erreur -->*/}
                            <p className="text-xs italic text-red-500">{message}</p>
                        </div>
                        {/*<!-- Modal footer -->*/}
                        <div className="items-center p-6 border-t border-gray-200 rounded-b">
                            <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="submit">
                                Valider
                            </button>
                        </div>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default AddMissionModal;