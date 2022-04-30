import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const ItemCredential = ({item, select, setSelect, setEditmodal, setRemovemodal}) => {





    // Convert date django for last update
    let first = new Date(item.lastupdate)
    let date = first.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})
    let time = first.toLocaleString('fr-FR', {hour: 'numeric', minute: 'numeric'})

    // Convert date django for date add
    let addDate = new Date(item.datecredential)
    let credAdd = addDate.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})




  return (
    <tr className="hover:bg-gray-100">
        <td className="p-2 lg:mr-0 text-left">
            <div className="text-base font-sans text-gray-900">{item.type}</div>
        </td>

        <td className="p-2 text-base font-sans text-gray-900">{item.montant}</td>

        <td className="p-2 text-base font-sans text-gray-900">{item.duree}</td>

        <td className="p-2 text-base font-sans text-gray-900">{item.contactclient}</td>

        <td className="p-2 text-base font-sans text-gray-900">{item.equipe}</td>

        <td className="p-2 text-base font-sans text-gray-900">{item.proposition}</td>

        <td className="p-2 text-base font-sans text-gray-900">{item.rapportfinal}</td>

        <td className="p-2 text-base font-sans text-gray-900">{date} à {time}</td>

        <td className="p-2 text-base font-sans text-gray-900">{credAdd}</td>

        <td className="p-2 space-x-2 text-center">
            <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 outline-none font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center" onClick={handleEdit}>
                <FontAwesomeIcon className="mr-2 h-5 w-5 text-lg" icon={faPenToSquare} />
            </button>
            <button type="button" className="text-white bg-red-600 outline-none hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center" onClick={handleRemove}>
                <FontAwesomeIcon className="mr-2 h-5 w-5 text-lg" icon={faTrashCan} />
            </button>
        </td>
    </tr>
  )
}

export default ItemCredential;