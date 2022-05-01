import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const AddCredentialModal = ({setAddmodal, setNewItem, newItem}) => {

    let [type, setType] = useState("")
    let [montant, setMontant] = useState("")
    let [duree, setDuree] = useState("")
    let [contactclient, setContactclient] = useState("")
    let [equipe, setEquipe] = useState("")
    let [proposition, setProposition] = useState("")
    let [rapportfinal, setRapportfinal] = useState("")
    let [message, setMessage] = useState("")

    // function add credential

    let addCredential = async (e) => {
        e.preventDefault();
        let formdata = new FormData();

        if (type)
        {
            formdata.append('type', type)
        }

        if (montant)
        {
            formdata.append('montant', montant)
        }

        if (duree)
        {
            formdata.append('duree', duree)
        }

        if (contactclient)
        {
            formdata.append('contactclient', contactclient)
        }

        if (equipe)
        {
            formdata.append('equipe', equipe)
        }

        if (proposition)
        {
            formdata.append('proposition', proposition)
        }

        if (rapportfinal)
        {
            formdata.append('rapportfinal', rapportfinal)
        }


        let resp = await fetch(`http://127.0.0.1:8000/api/credential/`, {
            method: 'POST',
            body:formdata
        })

        let data = await resp.json()

        if (data !== 200)
        {
            setMessage("Cette information existe déjà");
        }else{
            setNewItem(newItem = true)
            setAddmodal(false)
        }
    }



  return (
    <div className=" bg-gray-900 bg-opacity-50 fixed overflow-x-hidden overflow-y-auto inset-0 z-50 justify-center items-center h-modal sm:h-full" id="add-user-modal">
            <div className="mt-24 m-auto w-full max-w-2xl h-full md:h-auto">
                {/*<!-- Modal content -->*/}
                <div className="bg-white rounded-lg shadow relative">
                    {/*<!-- Modal header -->*/}
                    <div className="flex items-start justify-between p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold">
                            Add Credential
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => {setAddmodal(false)}}>
                            <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-gray-900 text-lg" />
                        </button>
                    </div>
                    {/*<!-- Modal body -->*/}
                    <div className="p-6 space-y-6">
                        <form method='post' onSubmit={addCredential}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="type" className="text-sm font-medium text-gray-900 block mb-2">Type</label>
                                    <input type="text" name="type" id="type" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5" onChange={(e)=>setType(e.target.value)}/>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="montant" className="text-sm font-medium text-gray-900 block mb-2">Montant</label>
                                    <input type="text" name="montant" id="montant" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5" onChange={(e)=>setMontant(e.target.value)}/>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="duree" className="text-sm font-medium text-gray-900 block mb-2">Durée</label>
                                    <input type="text" name="duree" id="duree" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5" onChange={(e)=>setDuree(e.target.value)}/>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="contact" className="text-sm font-medium text-gray-900 block mb-2">Contact Client</label>
                                    <input type="text" name="contact" id="contact" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"  onChange={(e)=>setContactclient(e.target.value)}/>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="equipe" className="text-sm font-medium text-gray-900 block mb-2">Equipe</label>
                                    <input type="text" name="equipe" id="equipe" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5" onChange={(e)=>setEquipe(e.target.value)}/>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="proposition" className="text-sm font-medium text-gray-900 block mb-2">Proposition</label>
                                    <input type="text" name="proposition" id="proposition" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5" onChange={(e)=>setProposition(e.target.value)}/>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                    <label htmlFor="rapport" className="text-sm font-medium text-gray-900 block mb-2">Rapport final</label>
                                        <textarea className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:border-blue-200 focus:outline-none" id="rapport" rows="3" placeholder="Saisir le rapport final" name="rapport" onChange={(e)=>{setRapportfinal(e.target.value)}}></textarea>
                                </div>

                            </div>
                            {/*<!-- Afficher Message d'erreur -->*/}
                            <p className="text-xs italic text-red-500 w-full">{message}</p>
                  
                    {/*<!-- Modal footer -->*/}
                    <div className="items-center p-6 border-t border-gray-200 rounded-b">
                        <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            type="submit">Valider</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddCredentialModal;