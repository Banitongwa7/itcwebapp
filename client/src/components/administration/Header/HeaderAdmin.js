import React, { useContext, useEffect, useState } from 'react';
import LogoWhite from './../../../assets/LogoWhite.png';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import Context from '../../../context/Context';


const HeaderAdmin = () => {

    // Context User
    let {admin, logoutAdmin} = useContext(Context)

    // notifications
    let [notification, setNotification] = useState([])

    // consult notification
    let [consult, setConsult] = useState(false)

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
        setConsult(true)
    }

    // Responsive menu
    let mobMenu = () => {
        let sumenu = document.querySelector("#menu")
        sumenu.classList.toggle("hidden")
    }

    // Function for Get Notification
    let fetchNotifications = async () => {
        let resp = await fetch("http://127.0.0.1:8000/api/notification/", {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            })

        let data = await resp.json()

        if (resp.status === 200)
        {
            setNotification(data)
        }

    }

    useEffect(() => {
        fetchNotifications()
    }, [])




  return (
<header >
            <nav>
            <section className="px-4 py-1.5 bg-gray-900 border-b border-gray-900 shadow-sm">
                <main className="flex items-center justify-between mx-10">

                    <section className="flex items-center space-x-8">
                            <div className="flex items-center space-x-2">
                                <Link exact to="/home" className=" w-12 text-white"><img src={LogoWhite} alt="logo" /></Link>
                            </div>
                        <div className="lg:block hidden">
                            <ul className="flex items-center text-sm font-normal space-x-2 text-white pb-[4px] pt-1">


                                <li>
                                  <NavLink to="/dashboard" exact activeClassName='active' className="mx-3 hover:text-green-400">
                                      <span>Dashboard</span>
                                  </NavLink>
                                </li>


                                <li>
                                  <NavLink to="/dashboard/opportunity" exact activeClassName='active' className="mx-3 hover:text-green-400">
                                      <span>Offre d'opportunités</span>
                                  </NavLink>
                                </li>

                                <li>
                                  <NavLink to="/dashboard/mission" exact activeClassName='active' className="mx-3 hover:text-green-400">
                                      <span>Missions</span>
                                  </NavLink>
                                </li>

                                <li>
                                  <NavLink to="/dashboard/allagent" exact activeClassName='active' className="mx-3 hover:text-green-400">
                                      <span>Compte Agent</span>
                                  </NavLink>
                                </li>

                                <li>
                                  <NavLink to="/dashboard/credential" exact activeClassName='active' className="mx-3 hover:text-green-400">
                                      <span>Credentials</span>
                                  </NavLink>
                                </li>

                                <li>
                                  <NavLink to="/dashboard/qualification" exact activeClassName='active' className="mx-3 hover:text-green-400">
                                      <span>Qualification</span>
                                  </NavLink>
                                </li>

                                <li>
                                  <NavLink to="/dashboard/logs" exact activeClassName='active' className="mx-3 hover:text-green-400">
                                      <span>Logs n8n</span>
                                  </NavLink>
                                </li>


                            </ul>
                        </div>

                    </section>

                    <section className="flex items-center space-x-5">
                        <div>
                            <ul className="flex items-center space-x-4 md:space-x-10">

                                <li className="mt-1">
                                    <button className="focus:outline-none relative" onClick={btnnotification}>
                                      <FontAwesomeIcon icon={faBell} className="lg:w-6 lg:h-6 w-5 h-5 text-gray-400 hover:text-gray-200 focus:text-gray-200"/>
                                      { consult === false ? (<span aria-hidden="true" className="animate-ping top-0 right-0 absolute inline-block w-3 h-3 rounded-full ring-2 ring-red-400 bg-red-700"></span>) : (null)}
                                    </button>

                                    <div id="notif" className=" hidden absolute origin-top-left left-[18%] md:left-[68%] mt-2 bg-gray-50 rounded-md shadow-lg overflow-hidden z-20 w-[20rem]">
                                        <div className="py-2">
                                            <div className="flex flex-col items-center px-4 py-3 border-b space-y-1">

                                            {/*Item notification*/}
                                    {
                                        notification.map((item, index) => {

                                            // Transform url
                                            let url = String(item.website)
                                            let result1 = url.split("//")
                                            let result2 = result1[1].split("/")
                                            let send = result2[0]

                                            // Transform time
                                            let tmp = String(item.time)
                                            let res1 = tmp.split(':', 2)
                                            let time = res1.join(" h ")

                                            return (
                                                <div key={index} className=" w-full pl-2 rounded-lg text-sm leading-5 text-gray-700 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"><span className="font-bold">{item.number} nouvelles offres d'appels</span> scrapées sur le site {send} à<span className="font-bold text-blue-500"> {time}</span>
                                                </div>
                                            )
                                        })
                                    }


                                            </div>
                                        </div>
                                        <div href="#" className="block bg-gray-800 text-white text-center font-bold py-2">Notifications</div>
                                    </div>
                                </li>



                                <li className='flex cursor-pointer items-center' onClick={btnsetting}>
                                  <img className="w-10 h-10 mr-4 rounded-full object-cover" src={picture} alt="profile" />
                                  <div className="mt-1">
                                      <div className="leading-3 text-sm text-white">
                                        {admin.full_name}
                                      </div>
                                      <small className="text-xs text-gray-400">Administrateur</small>
                                  </div>


                                  <div className="origin-top-right absolute right-0 top-12 z-56 w-56 rounded-md shadow-lg hidden" id="dropDownMenu">
                                    <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <div className="py-1">
                                            <Link to="/dashboard/settings" exact className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Settings</Link>
                                            <div onClick={logoutAdmin} className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Logout</div>
                                        </div>
                                        </div>
                                    </div>
                                </li>



                                <li className="lg:hidden block" >

                                    <button type='button' className="focus:outline-none focus:bg-gray-800 w-7 h-7 p-1 focus:ring ring-red-400 ring-opacity-50" onClick={mobMenu} >
                                      <FontAwesomeIcon icon={faBars} className="lg:w-6 lg:h-6 w-5 h-5 text-gray-400 hover:text-white"/>

                                    </button>
                                </li>

                            </ul>
                        </div>
                    </section>
                </main>
            </section>


            <section className="lg:hidden hidden bg-gray-800 p-4 space-y-4" id="menu">
                <div>
                    <ul className="flex flex-col space-y-5 text-sm font-normal text-white">
                      <li>
                        <NavLink to="/dashboard" exact activeClassName='active' className="mx-3 hover:text-green-400">
                            <span>Dashboard</span>
                        </NavLink>
                      </li>


                      <li>
                        <NavLink to="/dashboard/opportunity" exact activeClassName='active' className="mx-3 hover:text-green-400">
                            <span>Offre d'opportunités</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="/dashboard/mission" exact activeClassName='active' className="mx-3 hover:text-green-400">
                            <span>Missions</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="/dashboard/allagent" exact activeClassName='active' className="mx-3 hover:text-green-400">
                            <span>Compte Agent</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="/dashboard/credential" exact activeClassName='active' className="mx-3 hover:text-green-400">
                            <span>Credentials</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="/dashboard/qualification" exact activeClassName='active' className="mx-3 hover:text-green-400">
                            <span>Qualification</span>
                        </NavLink>
                      </li>



                    </ul>
                </div>

            </section>
        </nav>
    </header>

  )
}

export default HeaderAdmin;