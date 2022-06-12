import React, { useContext, useEffect } from 'react';
import LogoDark from './../../../assets/LogoDark.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faShield } from '@fortawesome/free-solid-svg-icons';
import Context from '../../../context/Context';
import { Link } from 'react-router-dom';
import mfacode from './../../../assets/mfacode.png';



const LoginAgent = () => {

    let {loginAgent, message, messageAuth, codeAuthCheck, stepAuth} = useContext(Context)



    // change interface

    let handleChange = () => {
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
        handleChange()
    })

    useEffect(() => {
        handleChange()
    }, [stepAuth])




    // pattern filter email

    // pattern="[a-z0-9._%+-]+@itc.net"

  return (
    <div className="h-[100vh] bg-gray-200">

        {/* Interface Login and Password */}
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" id="login">
            <div className="max-w-md w-full space-y-8 shadow-xl lg:max-w-xl rounded-xl m-5 p-5 bg-white">
                <div>
                    <img className="mx-auto h-12 w-auto" src={LogoDark} alt="logo ITC" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Connexion
                    </h2>
                </div>
                <form className="mt-8 space-y-6" method="POST" onSubmit={loginAgent}>
                    <div className="rounded-md shadow-sm space-y-6">
                    <div>
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-500">Email</label>
                        <div className="flex rounded-md mt-1">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"><FontAwesomeIcon icon={faEnvelope} /></span>
                        <input id="email-address" name="email" type="email" className="rounded-none flex-1 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="example@company.domain" required/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-500">Mot de passe</label>
                        <div className="flex rounded-md mt-1">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"><FontAwesomeIcon icon={faLock} /></span>
                        <input id="password" name="password" type="password" className="rounded-none flex-1 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="*********" required />
                        </div>
                        {/*<!-- Afficher Message d'erreur -->*/}
                        <p className="my-2 text-xs italic text-red-500">{message}</p>
                    </div>
                    </div>

                    <div className="flex items-center justify-between">

                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <Link to="/changepassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Mot de passe oublié ?
                        </Link>
                    </div>
                    </div>

                    <div>
                    <button type="submit" className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700">
                        Se connecter
                    </button>
                    </div>
                </form>
            </div>
        </div>


        {/* Interface Two Factor Authencation */}
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hidden" id="twoauth">
        <div className="max-w-md w-full space-y-6 bg-white p-5 lg:max-w-xl shadow-xl rounded-xl" >
            <div>
                <img className="mx-auto h-12 w-auto" src={LogoDark} alt="Workflow"/>
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
                <form className="space-y-6" onSubmit={codeAuthCheck}>
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

export default LoginAgent;