import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EditerQualificationModal = ({select, setEditmodal, setNewItem, newItem}) => {



    let [type, setType] = useState(select.typeopportunity)
    let [proposition, setProposition] = useState(select.proposition)

    let [message, setMessage] = useState("")



     // update qualification info
     let updateQualification = async (e) => {
        e.preventDefault();

        let formdata = new FormData()

        if (type !== select.typeopportunity)
        {
            formdata.append("typeopportunity", type)
        }


        if (proposition !== select.proposition)
        {
            formdata.append("proposition", proposition)
        }


        if (formdata.has('typeopportunity') || formdata.has('proposition'))
        {
            formdata.append('id', select.id)
            let resp = await fetch('http://127.0.0.1:8000/api/updatequalification/', {
            method: 'POST',
            body:formdata
            })

            let data = await resp.json()

            if (data !== 200)
            {
                setMessage("Erreur")
            }else{
                setNewItem(newItem = true)
                setEditmodal(false)
            }
        }else{
            setMessage("Vous n'avez rien modifier")
        }
    }



  return (
    <div className="bg-gray-900 bg-opacity-50 fixed overflow-x-hidden overflow-y-auto inset-0 z-50 justify-center items-center h-modal sm:h-full">
    <div className="mt-44 m-auto w-full max-w-2xl h-full md:h-auto">
        {/*
        <!-- Modal content -->*/}
        <div className="bg-white rounded-lg shadow relative">
            {/*<!-- Modal header -->*/}
            <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">
                    Editer la qualification
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={(e) => setEditmodal(false)}>
                    <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-gray-900 text-lg" />
                </button>
            </div>
            {/*<!-- Modal body -->*/}
            <div className="p-6 space-y-6">
                <form method="post" onSubmit={updateQualification}>
                    <div className="grid">

                        <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="type" className="text-sm font-medium text-gray-900 block mb-2">Type d'opportunité</label>
                            <input type="text" name="type" id="type" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5" value={type} onChange={(e)=>setType(e.target.value)}/>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="proposition" className="text-sm font-medium text-gray-900 block mb-2">Proposition</label>
                                <textarea className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:border-blue-200 focus:outline-none" id="proposition" rows="3" placeholder="Saisir la mission" name="proposition" value={proposition}  onChange={(e)=>{setProposition(e.target.value)}}></textarea>
                        </div>

                        {/*<!-- Afficher Message d'erreur -->*/}
                        <p className="text-xs italic text-red-500">{message}</p>
                    </div>
                    {/*<!-- Modal footer -->*/}
                    <div className="items-center p-6 border-t border-gray-200 rounded-b">
                        <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            type="submit">
                            Modifier
                        </button>
                    </div>
            </form>
        </div>
    </div>
</div>
</div>
  )
}

export default EditerQualificationModal;