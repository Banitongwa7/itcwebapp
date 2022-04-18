import React from 'react'

const MissionAdmin = () => {
  return (
    <section className="m-4 ">
    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
            <div className="sm:flex mt-4">
                <div className="sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                    <form className="lg:pr-3" action="#" method="GET">
                        <div className="mt-1 relative lg:w-64 xl:w-96">
                            <input type="text" name="searchname" id="users-search"
                                className="bg-gray-50 border border-gray-400 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                placeholder="Recherche ..." />
                        </div>
                    </form>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <button type="button" data-modal-toggle="add-user-modal"
                        className="w-1/2 text-white bg-blue-600 hover:bg-blue-700 outline-none font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                        <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Add Mission
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div className="flex flex-col">
        <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden">


                    <table className="table-fixed min-w-full divide-y border divide-gray-300">
                        <thead className="bg-gray-100">
                            <tr className="text-center">
                                <th></th>
                                <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                                    Nom complet
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                                    E-mail
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                                    Numero de téléphone
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hover:bg-gray-100 text-center">
                                <td className="p-4"><img className="h-10 w-10 rounded-full"
                                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt="avatar"/></td>
                                <td className="p-4 lg:mr-0">
                                    <div className="text-base font-sans text-gray-900">Jean Michel Louis</div>
                                </td>
                                <td className="p-4 text-base font-sans text-gray-900">Jean.Michel@itcconsulting.net</td>
                                <td className="p-4 text-base font-sans text-gray-900">54712230</td>
                                <td className="p-4 space-x-2">
                                    <button type="button" data-modal-toggle="user-modal"
                                        className="text-white bg-blue-600 hover:bg-blue-700 outline-none font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                        <i className="fa-solid fa-pen-to-square mr-2 h-5 w-5 text-lg"></i>
                                        Editer
                                    </button>
                                    <button type="button" data-modal-toggle="delete-user-modal"
                                        className="text-white bg-red-600 outline-none hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                        <i className="fa-solid fa-trash-can mr-2 h-5 w-5 text-lg"></i>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-100 text-center">
                                <td className="p-4"><img className="h-10 w-10 rounded-full"
                                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt="avatar"/></td>
                                <td className="p-4 lg:mr-0">
                                    <div className="text-base font-sans text-gray-900">Jean Michel Louis</div>
                                </td>
                                <td className="p-4 text-base font-sans text-gray-900">Jean.Michel@itcconsulting.net</td>
                                <td className="p-4 text-base font-sans text-gray-900">54712230</td>
                                <td className="p-4 space-x-2">
                                    <button type="button" data-modal-toggle="user-modal"
                                        className="text-white bg-blue-600 hover:bg-blue-700 outline-none font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                        <i className="fa-solid fa-pen-to-square mr-2 h-5 w-5 text-lg"></i>
                                        Editer
                                    </button>
                                    <button type="button" data-modal-toggle="delete-user-modal"
                                        className="text-white bg-red-600 outline-none hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                        <i className="fa-solid fa-trash-can mr-2 h-5 w-5 text-lg"></i>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default MissionAdmin;