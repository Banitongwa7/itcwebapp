import React, { useContext } from 'react';
import LogoDark from './../../assets/LogoDark.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Context from './../../context/Context';


const LoginAdmin = () => {

  let {loginAdmin, message} = useContext(Context)

  


    return (
      <div className="h-[100vh] bg-gray-200">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                    />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <div className="flex rounded-md mb-2">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"><FontAwesomeIcon icon={faLock}/></span>
                        <input className="w-full px-3 py-2 text-sm text-gray-900 border rounded-none rounded-r-md focus:outline-none focus:border-indigo-500" id="password" name="password" type="password" placeholder="*********" />
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
      </div>   
    )
}

export default LoginAdmin;