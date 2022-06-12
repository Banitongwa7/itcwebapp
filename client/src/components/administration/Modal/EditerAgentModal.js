import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EditerAgentModal = ({select, setEditmodal, setNewItem, newItem}) => {

    let [name, setName] = useState(select.full_name)
    let [phone, setPhone] = useState(select.phone)
    let [email, setEmail] = useState(select.email)
    let [pic, setPic] = useState(select.picture)
    let [passw, setPassw] = useState('')
    let [message, setMessage] = useState('')


    // update agent info
    let updateAgent = async (e) => {
        e.preventDefault();

        let formdata = new FormData();

        if (pic !== select.picture)
        {
            formdata.append('picture', pic, pic.name)
        }

        if (name !== select.full_name)
        {
            formdata.append('full_name', name)
        }

        if(phone !== select.phone)
        {
            formdata.append('phone', phone)
        }

        if(passw)
        {
            formdata.append('password', passw)
        }

        formdata.append('email', email)

        let resp = await fetch(`http://127.0.0.1:8000/api/editagent/${select.id}`, {
            method: 'post',
            body:formdata
        })

        let data = await resp.json()

        if (data !== 200)
        {
            setMessage("Erreur");
        }else{
            setEditmodal(false)
            setNewItem(newItem = true)
        }
    }

    let picProfile = (e) => {
        let file = e.target.files[0]
        setPic(file)
    }

  return (
    <div className="bg-gray-900 bg-opacity-50 fixed overflow-x-hidden overflow-y-auto inset-0 z-50 justify-center items-center h-modal sm:h-full" id="user-modal">
        <div className="mt-52 m-auto w-full max-w-2xl h-full md:h-auto">
            {/*<!-- Modal content -->*/}
            <div className="bg-white rounded-lg shadow relative">
                {/*<!-- Modal header -->*/}
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold">
                        Editer Utilisateur
                    </h3>
                    <button type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-toggle="user-modal" onClick={() => {setEditmodal(false)}}>
                        <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-gray-900 text-lg" />
                    </button>
                </div>
                {/*<!-- Modal body -->*/}
                <div className="p-6 space-y-6">
                    <form method='post' onSubmit={updateAgent}>
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="namefull" className="text-sm font-medium text-gray-900 block mb-2">Nom complet</label>
                                <input type="text" name="namefull" id="namefull"
                                    className="shadow-sm bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                    value={name} required onChange={(e)=>setName(e.target.value)}/>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">E-mail</label>
                                <input type="email" name="email" id="email"
                                    className="shadow-sm bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                    value={email} required onChange={(e)=>setEmail(e.target.value)}/>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-900 block mb-2">Numero de téléphone</label>
                                <input type="tel" name="phone" id="phone" className="shadow-sm bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                    value={phone} required onChange={(e)=>setPhone(e.target.value)}/>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="picturenew" className="text-sm font-medium text-gray-900 block mb-2">Photo de profile</label>
                                    <input type="file" name="picturenew" id="picturenew" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"  onChange={picProfile}/>
                            </div>


                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="newpassw" className="text-sm font-medium text-gray-900 block mb-2">Changer mot de passe</label>
                                <input type="password" name="newpassw" id="newpassw" className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                    placeholder="**********" onChange={(e)=>setPassw(e.target.value)}/>
                            </div>
                        </div>
                         {/*<!-- Afficher Message d'erreur -->*/}
                         <p className="text-xs italic text-red-500 w-full">{message}</p>
                
                        {/*<!-- Modal footer -->*/}
                        <div className="items-center p-6 border-t border-gray-200 rounded-b">
                            <button
                                className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="submit">Enregistrer</button>
                        </div>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default EditerAgentModal;