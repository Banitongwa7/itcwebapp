import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



const AddAgentModal = ({setAddmodal, setNewItem, newItem}) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [pic, setPic] = useState(null)
    const [passw, setPassw] = useState('')
    const [passwconfirm, setPasswconfirm] = useState('')
    let [message, setMessage] = useState('')

    // picture profile

    let picProfile = (e) => {
        console.log(e)
        let file = e.target.files[0]
        setPic(file)
    }


    // function add agent
    let addAgent = async (e) => {
        e.preventDefault();
        if (passw !== passwconfirm)
        {
            setMessage("Les deux mot de passe ne sont pas identiques")
        }else{
            let formdata = new FormData();

            if (pic)
            {
                formdata.append('picture', pic, pic.name)
            }
            formdata.append('full_name', name)
            formdata.append('phone', phone)
            formdata.append('email', email)
            formdata.append('password', passw)

            let resp = await fetch(`http://127.0.0.1:8000/api/agent/`, {
                method: 'POST',
                body:formdata
            })

            let data = await resp.json()

            if (data !== 200)
            {
                setMessage("L'email existe déjà dans la table");
            }else{
                setNewItem(newItem = true)
                setAddmodal(false)
            }

        }
    }





  return (
    <div className=" bg-gray-900 bg-opacity-50 fixed overflow-x-hidden overflow-y-auto inset-0 z-50 justify-center items-center h-modal sm:h-full" id="add-user-modal">
            <div className="mt-52 m-auto w-full max-w-2xl h-full md:h-auto">
                {/*<!-- Modal content -->*/}
                <div className="bg-white rounded-lg shadow relative">
                    {/*<!-- Modal header -->*/}
                    <div className="flex items-start justify-between p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold">
                            Add new user
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="add-user-modal" onClick={() => {setAddmodal(false)}}>
                            <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-gray-900 text-lg" />
                        </button>
                    </div>
                    {/*<!-- Modal body -->*/}
                    <div className="p-6 space-y-6">
                        <form method='post' onSubmit={addAgent}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="namefullnew" className="text-sm font-medium text-gray-900 block mb-2">Nom complet</label>
                                    <input type="text" name="namefullnew" id="namefullnew" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"
                                        placeholder="Ex : Jean Michel" required onChange={(e)=>setName(e.target.value)}/>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="emailnew" className="text-sm font-medium text-gray-900 block mb-2">Email</label>
                                    <input type="email" name="emailnew" id="emailnew" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"
                                        placeholder="example@company.com" required onChange={(e)=>setEmail(e.target.value)}/>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="phonenew" className="text-sm font-medium text-gray-900 block mb-2">Numero de téléphone</label>
                                    <input type="tel" name="phonenew" id="phonenew" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"
                                        placeholder="Ex : 58471203" title="Ex : 58471203" pattern="[0-9]{8}" required onChange={(e)=>setPhone(e.target.value)}/>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="picturenew" className="text-sm font-medium text-gray-900 block mb-2">Photo de profile</label>
                                    <input type="file" name="picturenew" id="picturenew" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"  onChange={picProfile}/>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="passwnew" className="text-sm font-medium text-gray-900 block mb-2">Mot de passe</label>
                                    <input type="password" name="passwnew" id="passwnew" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"
                                        placeholder="**********" required onChange={(e)=>setPassw(e.target.value)}/>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="confirmpasswnew" className="text-sm font-medium text-gray-900 block mb-2">Confirmer mot de passe</label>
                                    <input type="password" name="confirmpasswnew" id="confirmpasswnew" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"
                                        placeholder="**********" required onChange={(e)=>setPasswconfirm(e.target.value)}/>
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

export default AddAgentModal;