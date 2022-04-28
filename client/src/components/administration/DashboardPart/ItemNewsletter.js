import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ItemNewsletter = ({item, setSelect, setRemoveModal}) => {

  let RemoveEmail = () => {
    setRemoveModal(true)
    setSelect(item)
  }


  return (
    <tr className="text-gray-900">
        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
            {item.fullname}
        </th>
        <td className="border-t-0 px-4 align-middle text-sm text-center whitespace-nowrap p-4">{item.emailInscrit}</td>
        <td className="border-t-0 px-4 align-middle text-sm text-center">
            <button type="button" className="text-white bg-red-600 outline-none hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2" onClick={RemoveEmail}>
                <FontAwesomeIcon icon={faTrashCan} className="mr-2 h-5 w-5 text-lg"/>
                Supprimer
            </button>
        </td>
    </tr>
  )
}

export default ItemNewsletter;