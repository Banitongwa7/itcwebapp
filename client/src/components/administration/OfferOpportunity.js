import React from 'react';
import { Link } from 'react-router-dom';

const OfferOpportunity = () => {




    
  return (
    <section className="antialiased font-sans my-5">
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">

                {/*<!-- Filter and search -->*/}
                <div className="my-2 justify-between flex sm:flex-row flex-col">

                    {/*<!-- Search bar -->*/}
                    <div className="block relative">
                        <form action="#" method="post">
                            <button type="submit" className="h-full absolute inset-y-0 left-0.5 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500 hover:text-gray-900">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </button>
                            <input type="search" placeholder="Recherche" name="recherche"
                                className="appearance-none rounded-full sm:rounded-full border-gray-400 border block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                        </form>
                    </div>


                    {/*<!-- Filter -->*/}
                    <div className="flex items-center text-gray-700 px-3 py-1 border font-medium rounded">
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" className="w-5 h-full">
                            <g>
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z">
                                </path>
                            </g>
                        </svg>
                        <select className="form-select hover:bg-teal-100 bg-transparent appearance-none block text-gray-700 text-center transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none"
                            aria-label="Default select example">
                            <option selected>Filtrer par...</option>
                            <option value="1">Recent</option>
                            <option value="2">Ancien</option>
                        </select>
                    </div>


                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full overflow-hidden">
                        <div className="min-w-full">
                            <div>


                                {/*<!-- Row 1 -->*/}
                                <div className="border-gray-250 border mb-5 pb-4 shadow-lg">
                                    <form action="#" method="post">
                                        <div className="flex sm:flex-row flex-col justify-between px-5 py-5 bg-white">
                                            <div className="flex items-center w-full h-full">
                                                <div className="w-96 h-20 hidden md:block">
                                                    <img className="rounded object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" alt="" />
                                                </div>
                                                <div className="px-4 flex flex-wrap">
                                                    <span className="text-sm font-semibold text-gray-900 mb-1">Gloria Roberston</span>
    
                                                    <span className="text-sm font-semibold text-gray-600">Lorem ipsum dolor sit
                                                        amet consectetur adipisicing elit. Error nulla accusamus incidunt
                                                        iure quod! Ipsum facilis quibusdam vel ut, quae, exercitationem
                                                        corporis labore ipsa voluptatibus sed recusandae, beatae amet!
                                                        Perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, voluptatibus. Autem assumenda aliquam veniam blanditiis, nulla unde necessitatibus dolores, quas deleniti repellendus excepturi, officiis consequuntur quaerat quos dolor repudiandae soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod necessitatibus repellendus non, consequatur ipsa autem unde vero soluta modi saepe? In autem impedit reprehenderit, nisi quaerat odit corrupti mollitia blanditiis.</span>
                                                </div>
                                            </div>
                                            <div className="md:w-40 mr-4 sm:mt-5 h-20 text-right md:flex md:flex-wrap justify-end justify-items-end">
                                                <span className="text-sm font-normal text-gray-600">2 days ago</span>
                                                <div className="mt-2">
                                                    <Link to="#" className="text-blue-700 text-sm  inline-flex items-center font-semibold tracking-wide" target="_blank" rel="noopener noreferrer">
                                                        <span className="hover:underline">
                                                            Consulter le lien
                                                        </span>
                                                        <span className="text-xl ml-2">&#8594;</span>
                                                    </Link>
                                                </div>
                                                <div className="flex items-end md:mt-8">
                                                    <button type="submit" className="h-8 w-auto p-1 rounded-lg text-sm font-sans text-white bg-green-600">Opportunité</button>
                                                </div>
                                            </div>
                                         
                                        </div>
                                    </form>
                                </div>

                                 {/*<!-- Row 2 -->*/}
                                 <div className="border-gray-250 border mb-5 pb-4 shadow-lg">
                                    <form action="#" method="post">
                                        <div className="flex sm:flex-row flex-col justify-between px-5 py-5 bg-white">
                                            <div className="flex items-center w-full h-full">
                                                <div className="w-96 h-20 hidden md:block">
                                                    <img className="rounded object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" alt="" />
                                                </div>
                                                <div className="px-4 flex flex-wrap">
                                                    <span className="text-sm font-semibold text-gray-900 mb-1">Gloria Roberston</span>
    
                                                    <span className="text-sm font-semibold text-gray-600">Lorem ipsum dolor sit
                                                        amet consectetur adipisicing elit. Error nulla accusamus incidunt
                                                        iure quod! Ipsum facilis quibusdam vel ut, quae, exercitationem
                                                        corporis labore ipsa voluptatibus sed recusandae, beatae amet!
                                                        Perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, voluptatibus. Autem assumenda aliquam veniam blanditiis, nulla unde necessitatibus dolores, quas deleniti repellendus excepturi, officiis consequuntur quaerat quos dolor repudiandae soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod necessitatibus repellendus non, consequatur ipsa autem unde vero soluta modi saepe? In autem impedit reprehenderit, nisi quaerat odit corrupti mollitia blanditiis.</span>
                                                </div>
                                            </div>
                                            <div className="md:w-40 mr-4 sm:mt-5 h-20 text-right md:flex md:flex-wrap justify-end justify-items-end">
                                                <span className="text-sm font-normal text-gray-600">2 days ago</span>
                                                <div className="mt-2">
                                                    <Link to="#" className="text-blue-700 text-sm  inline-flex items-center font-semibold tracking-wide" target="_blank" rel="noopener noreferrer">
                                                        <span className="hover:underline">
                                                            Consulter le lien
                                                        </span>
                                                        <span className="text-xl ml-2">&#8594;</span>
                                                    </Link>
                                                </div>
                                                <div className="flex items-end md:mt-8">
                                                    <button type="submit" className="h-8 w-auto p-1 rounded-lg text-sm font-sans text-white bg-green-600">Opportunité</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default OfferOpportunity;