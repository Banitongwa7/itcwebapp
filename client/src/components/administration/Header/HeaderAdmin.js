import React, { useContext } from 'react';
import LogoWhite from './../../../assets/LogoWhite.png';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import Context from '../../../context/Context';


const HeaderAdmin = () => {

    let {admin, logoutAdmin} = useContext(Context)

    // button setting
    let btnsetting = () => {
        var cible = document.querySelector('#dropDownMenu')
        let notif = document.querySelector('#notif')
        if (! notif.classList.contains('.hidden'))
        {
            notif.classList.add('hidden')
        }
        cible.classList.toggle('hidden');
    }

    // traitement image profile

    let pictureWithQuote = admin.picture
    let pictureWithoutQuote = pictureWithQuote.replaceAll('"', '')
    let picture = "http://127.0.0.1:8000/profile/" + pictureWithoutQuote


    // button notification
    let btnnotification = () => {
        let notif = document.querySelector('#notif')
        var cible = document.querySelector('#dropDownMenu')
        if (! cible.classList.contains('.hidden'))
        {
            cible.classList.add('hidden')
        }
        notif.classList.toggle('hidden')
    }


    /*

 <div class="flex justify-center h-screen">

        <div class="relative my-32">

            <button    class="relative z-10 block rounded-md bg-white p-2 focus:outline-none">
                <svg class="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
            </button>

            
        </div>
    </div>



    */




  return (
    <nav className="bg-gray-900 border-b border-gray-300 shadow-sm">
    <div className="w-full">
        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6">

            <div className="flex flex-row items-center justify-between">
                <Link exact to="/dashboard"><img src={LogoWhite} className="md:mr-5 w-12" alt="logo" /></Link>
                <button className="md:hidden">
                    <span className='text-2xl text-white mx-3 w-6 h-6'><FontAwesomeIcon icon={faBars} /></span>
                </button>


                <ul className="text-sm font-normal hidden md:flex">

                    <li className="mx-3 text-white hover:text-green-400 relative inline-block text-left">
                        <NavLink to="/dashboard" exact activeClassName='active' className=" py-4 inline-flex items-center mt-1">
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="mx-3 text-white hover:text-green-400 relative inline-block text-left">
                        <NavLink to="/dashboard/opportunity" exact activeClassName='active' className=" py-4 inline-flex items-center mt-1">
                            <span>Offre d'opportunités</span>
                        </NavLink>
                    </li>

                    <li className="mx-3 text-white hover:text-green-400 relative inline-block text-left">
                        <NavLink to="/dashboard/mission" exact activeClassName='active' className=" py-4 inline-flex items-center mt-1">
                            <span>Missions</span>
                        </NavLink>
                    </li>

                    <li className="mx-3 text-white hover:text-green-400 relative inline-block text-left">
                        <NavLink to="/dashboard/allagent" exact activeClassName='active' className=" py-4 inline-flex items-center mt-1">
                            <span>Compte Agent</span>
                        </NavLink>
                    </li>

                    <li className="mx-3 text-white hover:text-green-400 relative inline-block text-left">
                        <NavLink to="/dashboard/credential" exact activeClassName='active' className=" py-4 inline-flex items-center mt-1">
                            <span>Credentials</span>
                        </NavLink>
                    </li>

                    <li className="mx-3 text-white hover:text-green-400 relative inline-block text-left">
                        <NavLink to="/dashboard/qualification" exact activeClassName='active' className=" py-4 inline-flex items-center mt-1">
                            <span>Qualification</span>
                        </NavLink>
                    </li>

                </ul>
            </div>

            <nav className="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
                <button onClick={btnnotification} className="mt-3 relative mx-5" id="bouton">
                    <span className='text-white text-xl'><FontAwesomeIcon icon={faBell} /></span>
                    <span aria-hidden="true" className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"></span>
                </button>


                <div id="notif" class=" hidden absolute origin-top-left left-[58%] mt-12 bg-gray-50 rounded-md shadow-lg overflow-hidden z-20 w-[20rem]">
                <div class="py-2">


                    <div href="#" class="flex flex-col items-center px-4 py-3 border-b space-y-1">
                       
                        <div className=" w-full pl-2 rounded-lg text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"><span class="font-bold" href="#">Sara Salah</span> replied on the <span
                                class="font-bold text-blue-500" href="#">Upload Image</span> artical . 2m
                        </div>

                        <div className=" w-full pl-2 rounded-lg text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"><span class="font-bold" href="#">Sara Salah</span> replied on the <span
                                class="font-bold text-blue-500" href="#">Upload Image</span> artical . 2m
                        </div>

                        <div className=" w-full pl-2 rounded-lg text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"><span class="font-bold" href="#">Sara Salah</span> replied on the <span
                                class="font-bold text-blue-500" href="#">Upload Image</span> artical . 2m
                        </div>

                        <div className=" w-full pl-2 rounded-lg text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"><span class="font-bold" href="#">Sara Salah</span> replied on the <span
                                class="font-bold text-blue-500" href="#">Upload Image</span> artical . 2m
                        </div>

                        <div className=" w-full pl-2 rounded-lg text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"><span class="font-bold" href="#">Sara Salah</span> replied on the <span
                                class="font-bold text-blue-500" href="#">Upload Image</span> artical . 2m
                        </div>

                        <div className=" w-full pl-2 rounded-lg text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"><span class="font-bold" href="#">Sara Salah</span> replied on the <span
                                class="font-bold text-blue-500" href="#">Upload Image</span> artical . 2m
                        </div>

                       
                    </div>
                    
                </div>
                <div href="#" class="block bg-gray-800 text-white text-center font-bold py-2">Notifications</div>
            </div>









                

   

                <div className="inline-block relative text-left" onClick={btnsetting}>
                    <div className="flex items-center mx-2 dropdown-toggle cursor-pointer" data-dropdown="dropDownMenu" id="settingmenu">
                        <img className="w-10 h-10 mr-4 rounded-full object-cover" src={picture} alt="Avatar" />
                        <div className="mt-1 hidden md:block">
                            <div className="leading-3 text-sm text-white">
                                {admin.full_name}
                            </div>
                            <small className="text-xs text-gray-400">Administrateur</small>
                        </div>
                    </div>

                    <div className="origin-top-right absolute right-0 mt-3 z-56 w-56 rounded-md shadow-lg hidden" id="dropDownMenu">
                        <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <div className="py-1">
                                <Link to="/dashboard/settings" exact className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Settings</Link>
                                <div onClick={logoutAdmin} className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</nav>
  )
}

export default HeaderAdmin;