import React, { useContext, useState } from 'react';
import LogoDark from './../assets/LogoDark.png';
import mfacode from './../assets/mfacode.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield  } from '@fortawesome/free-solid-svg-icons';
import Context from './../context/Context';
import { useHistory } from 'react-router-dom';

const TwoFactor = () => {
    let {agent} = useContext(Context)

    let [code, setCode] = useState("")
    let [message, setMessage] = useState("")

    let history = useHistory()

    let CodeCheck = async (e) => {
        e.preventDefault();
        const reg = new RegExp('^[0-9]+$');

        if (reg.test(code) && code.length === 5){
            let resp = await fetch(`http://127.0.0.1:8000/api/codeauth/${agent.user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'number':code})
            })
            let data = await resp.json()
            if (data !== 200)
            {
                setMessage("Code Invalide !")
            }else{
            history.push("/home")
            }
        }else{
            setMessage("Code Invalide !")
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 bg-white p-5 lg:max-w-xl shadow-xl rounded-xl">
            <div>
                <img className="mx-auto h-12 w-auto" src={LogoDark} alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Two Factor Authentication
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    <span className="font-medium text-blue-600">
                        Saisissez votre code figurant dans votre adresse E-mail.
                    </span>
                </p>
                <p className="mt-2 text-center">
                <img className=' object-cover mx-auto h-10 w-auto' src={mfacode} alt="mfa" />
                </p>
                <p className="mt-2 text-center text-sm text-gray-600">
                    <span className="font-medium text-red-600">
                        {message}
                    </span>
                </p>
            </div>

            <div className="max-w-md lg:max-w-xl rounded overflow-hidden p-3">
                <form className="space-y-6" onSubmit={CodeCheck}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="grid gap-3">
                            <label htmlFor="code" className="block text-center text-sm font-medium text-gray-500">Votre code d'authentification</label>
                            <div className="flex rounded-md mt-1">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> <FontAwesomeIcon icon={faShield} /></span>
                              <input id="code" name="code" type="text" required className=" text-center rounded-none flex-1 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              placeholder="..." pattern="[0-9]{5}" onChange={(e)=>{setCode(e.target.value)}}/>
                              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> <FontAwesomeIcon icon={faShield} /></span>
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

export default TwoFactor;