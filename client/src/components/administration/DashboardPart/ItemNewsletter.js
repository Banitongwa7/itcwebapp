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
        <th className="border-t-0 px-4 align-middle text-sm font-normal text-left">
            {item.fullname}
        </th>
        <td className="border-t-0 px-4 align-middle text-sm text-center ">{item.emailInscrit}</td>
        <td className="py-3 px-2 text-center">
            <div className="flex item-center justify-center">
                <div className="w-4 mr-2 text-red-800 transform hover:text-red-500 hover:scale-110 cursor-pointer" onClick={RemoveEmail}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>
            </div>
        </td>
    </tr>
  )
}

export default ItemNewsletter;