import React, { useContext, useEffect } from 'react';
import LogoDark from './../../../assets/LogoDark.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faShield } from '@fortawesome/free-solid-svg-icons';
import Context from '../../../context/Context';
import mfacode from './../../../assets/mfacode.png';


const LoginAdmin = () => {

  let {loginAdmin, message, messageAuth, codeAuthCheckAdmin, stepAuth} = useContext(Context)

  // change interface

  let change = () => {
        let login = document.querySelector('#login')
        let twoauth = document.querySelector('#twoauth')
        if (stepAuth === true)
        {
            login.classList.add("hidden")
            twoauth.classList.remove("hidden")
        }else{
            
            if (login.classList.contains("hidden"))
            {
                login.classList.remove("hidden")
            }

            if (!login.classList.contains("hidden"))
            {
                twoauth.classList.add("hidden")
            }
        }
    }

    useEffect(() => {
        change()
    })

    useEffect(() => {
        change()
    }, [stepAuth])



    return (
      <div className="h-[100vh] bg-gray-200">

      {/* Interface Login and Password */}
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" id="login">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-xl">
                    {/*<!-- Col 1 -->*/}
                    <div className="imagelogin w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">

                        </div>
                    {/*<!-- Col 2 -->*/}
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <img className="mx-auto h-12 w-auto" src={LogoDark} alt="logo" />
                        <h3 className="p-4 text-xl font-serif text-gray-600 text-center">ADMINISTRATION ITC</h3>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded"  method="POST" onSubmit={loginAdmin}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <div className="flex rounded-md">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"><FontAwesomeIcon icon={faEnvelope}/></span>
                                <input className="w-full px-3 py-2 text-sm text-gray-900 border rounded-none rounded-r-md focus:outline-none focus:border-indigo-500"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email of administrator"
                                required
                            />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                Password
                            </label>
                            <div className="flex rounded-md mb-2">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"><FontAwesomeIcon icon={faLock}/></span>
                                <input className="w-full px-3 py-2 text-sm text-gray-900 border rounded-none rounded-r-md focus:outline-none focus:border-indigo-500" id="password" name="password" type="password" placeholder="*********" required/>
                            </div>
                            {/*<!-- Afficher Message d'erreur -->*/}
                            <p className="text-xs italic text-red-500">{message}</p>

                        </div>
                        <div className="mb-4">
                            <input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
                            <label className="text-sm" htmlFor="checkbox_id">
                                Remember Me
                            </label>
                        </div>
                        <div className="mt-6 text-center">
                            <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
                                Se connecter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        {/* Interface Two Factor Authencation */}
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hidden" id="twoauth">
            <div className="max-w-md w-full space-y-6 bg-white p-5 lg:max-w-xl shadow-xl rounded-xl " >
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
                            {messageAuth}
                        </span>
                    </p>
                </div>

                <div className="max-w-md lg:max-w-xl rounded overflow-hidden p-3">
                    <form className="space-y-6" onSubmit={codeAuthCheckAdmin}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="grid gap-3">
                                <label htmlFor="code" className="block text-center text-sm font-medium text-gray-500">Votre code d'authentification</label>
                                <div className="flex rounded-md mt-1">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> <FontAwesomeIcon icon={faShield} /></span>
                                <input id="code" name="code" type="text" required className=" text-center rounded-none flex-1 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="..." pattern="[0-9]{5}"/>
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


      </div>   
    )
}

export default LoginAdmin;