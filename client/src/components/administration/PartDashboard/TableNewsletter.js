import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const TableNewsletter = () => {




  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8">
        <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Les abonnées à la newsletter</h3>
        {/*<!-- Button Add Newsletter -->*/}
        <div className="flex w-full justify-end my-5">
            <button type="button" data-modal-toggle="add-newsletter-modal" className="w-1/2 text-white bg-blue-900 hover:bg-blue-700 outline-none font-medium flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                <FontAwesomeIcon icon={faPlus} className="mr-1 h-5 w-6 text-lg"/>
                <span>Ajouter un E-mail</span>
            </button>
        </div>

        <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border border-gray-400">

                <thead className="border border-gray-400">
                    <tr className="text-center">
                        <th
                            className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Nom d'utilisateur</th>
                        <th
                            className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                            Adresse E-mail</th>
                        <th
                            className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                            Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-400">


                    <tr className="text-gray-900 text-center">
                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap">Jean
                            Michel
                        </th>
                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                            jean.michel@itconsulting.net</td>
                        <td className="border-t-0 px-4 align-middle text-xs">
                            <button type="button" data-modal-toggle="delete-newsletter-modal" className="text-white bg-red-600 outline-none hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                <FontAwesomeIcon icon={faTrashCan} className="mr-2 h-5 w-5 text-lg"/>
                                Supprimer
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TableNewsletter;