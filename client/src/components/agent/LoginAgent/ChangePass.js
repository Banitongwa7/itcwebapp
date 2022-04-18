import React, { useState } from 'react';
import LogoDark from '../../../assets/LogoDark.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { useHistory } from 'react-router-dom';

const ChangePass = () => {

    let [email, setEmail] = useState("")
    let [message, setMessage] = useState('')

    const history = useHistory()


    let ChangePass = async (e) => {
        e.preventDefault();

        let resp = await fetch("http://127.0.0.1:8000/api/lostpassword/", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':email})
        })
        let data = await resp.json()
        if (data !== 200)
        {
            setMessage("Votre Email n'est pas reconnu !")
        }else{
           history.push("/confirmpassword")
        }
    }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 bg-white p-5 lg:max-w-xl shadow-xl rounded-xl">
            <div>
                <img className="mx-auto h-12 w-auto" src={LogoDark} alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Mot de passe oublié
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    <span className="font-medium text-blue-600">
                        Réinitialisez votre mot de passe en saissisant votre addresse email.
                    </span>
                </p>
                <p className="mt-2 text-center text-sm text-gray-600">
                    <span className="font-medium text-red-600">
                        {message}
                    </span>
                </p>
            </div>

            <div className="max-w-md lg:max-w-xl rounded overflow-hidden p-3">
                <form className="space-y-6" onSubmit={ChangePass}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="grid gap-3">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-500">Email</label>
                            <div className="flex rounded-md mt-1">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> <FontAwesomeIcon icon={faEnvelope} /> </span>
                              <input id="email" name="email" type="email" required className="rounded-none flex-1 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              placeholder="Entrer votre adresse email..." onChange={(e)=>{setEmail(e.target.value)}}/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700">
                            Valider
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
  )

}

export default ChangePass;