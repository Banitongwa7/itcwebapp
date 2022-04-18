import React, { useContext } from 'react';
import LogoWhite from './../../assets/LogoWhite.png';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import Context from './../../context/Context';


const HeaderAgent = () => {

    let {agent, logoutAgent} = useContext(Context)



    // traitement image profile

    let pictureWithQuote = agent.picture
    let pictureWithoutQuote = pictureWithQuote.replaceAll('"', '')
    let picture = "http://127.0.0.1:8000/profile/" + pictureWithoutQuote


    
    let btnsetting = (e) => {
        var cible = document.querySelector('#dropDownMenu');
        cible.classList.toggle('hidden');
    }




    return (
        <nav className="bg-gray-900 border-b border-gray-300 shadow-sm">
            <div className="flex items-center justify-between flex-wrap mx-auto max-w-screen-xl">
                <div className="flex items-center mx-2 py-3 md:py-0">

                    <div className="flex items-center ml-3">
                        <Link to="/home" className="pr-6"> <img src={LogoWhite} className="w-12" alt="logo" /> </Link>
                    </div>

                    <ul className="text-sm font-normal flex">

                        <NavLink exact to="/home"  activeClassName='active' className="mx-3 py-4 text-white hover:text-green-400 font-medium">
                                Home
                        </NavLink>

                        <NavLink exact to="/home/mission"  activeClassName='active'  className="mx-3 py-4 text-white hover:text-green-400 font-medium">
                                <span className="ml-1">Missions</span>
                        </NavLink>
                    </ul>
                </div>

                <div className="flex items-center">
                    <button className="mt-1 relative mx-10">
                        <span className='text-white text-xl'><FontAwesomeIcon icon={ faBell } /></span>
                        <span aria-hidden="true" className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"></span>
                    </button>

                    <div className="inline-block relative text-left" onClick={btnsetting}>
                        <div className="flex items-center mx-2 dropdown-toggle cursor-pointer" data-dropdown="dropDownMenu">
                            <img className="w-10 h-10 mr-4 rounded-full object-cover"
                                src={picture}
                                alt="Avatar" />
                            <div className="mt-1 hidden md:block">
                                <div className="leading-3 text-sm text-white">
                                    {agent.full_name}
                                </div>
                                <small className="text-xs text-gray-400">Agent</small>
                            </div>
                        </div>

                        <div className="origin-top-right absolute right-0 mt-3 z-56 w-56 rounded-md shadow-lg hidden"
                            id="dropDownMenu">
                            <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical"
                                aria-labelledby="options-menu">
                                <div className="py-1">
                                    <Link exact to="/home/settings" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Settings</Link>
                                    <div onClick={logoutAgent} className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Logout</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </nav>
  )
}

export default HeaderAgent;