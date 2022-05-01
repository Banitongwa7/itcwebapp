import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

const ItemMission = ({item,select , setSelect, setEditmodal, setRemovemodal }) => {


    // Remove Mission
    let handleRemove = () =>{
        setSelect(select = item)
        setRemovemodal(true)
    }

    // Edit Mission
    let handleEdit = () =>{
        setSelect(select = item)
        setEditmodal(true)
    }

    // Convert date django for last update
    let first = new Date(item.lastupdate)
    let date = first.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})
    let time = first.toLocaleString('fr-FR', {hour: 'numeric', minute: 'numeric'})

    // Convert date django for date add
    let addDate = new Date(item.datemission)
    let missionAdd = addDate.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})

  return (
    <tr className="hover:bg-gray-100">
        <td className="p-2 text-base font-sans text-gray-900 truncate">{item.description}</td>

        <td className="p-2 text-base font-sans text-center text-gray-900">
        <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full font-medium text-xs" >{date} à {time}</span>
        </td>

        <td className="p-2 text-base font-sans text-center text-gray-900">
        
        <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full font-medium text-xs" >{missionAdd}</span>
        </td>

        <td className="py-3 px-2 text-center">
            <div className="flex item-center justify-center">
                <div className="w-4 mr-5 transform text-blue-800 hover:text-blue-500 hover:scale-110 cursor-pointer" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faPencil} />
                </div>
                <div className="w-4 mr-2 text-red-800 transform hover:text-red-500 hover:scale-110 cursor-pointer" onClick={handleRemove}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>
            </div>
        </td>
    </tr>
  )
}

export default ItemMission;