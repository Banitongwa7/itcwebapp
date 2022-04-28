import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const AccountItem = ({agent, setSelect, setRemovemodal,  setEditmodal}) => {

    let editUser = () => {
        setEditmodal(true)
        setSelect(agent)
    }

    let removeUser = () => {
        setRemovemodal(true)
        setSelect(agent)
    }

    // traitement image profile

    let pictureWithQuote = agent.picture
    let pictureWithoutQuote = pictureWithQuote.replaceAll('"', '')
    let picture = "http://127.0.0.1:8000" + pictureWithoutQuote


  return (
    <tr className="hover:bg-gray-100 text-center">
        <td className="p-4"><img className="h-10 w-10 rounded-full"
                src={picture}
                alt="agent account"/></td>
        <td className="p-4 lg:mr-0">
            <div className="text-base font-sans text-gray-900">{agent.full_name}</div>
        </td>
        <td className="p-4 text-base font-sans text-gray-900">{agent.email}</td>
        <td className="p-4 text-base font-sans text-gray-900">{agent.phone}</td>
        <td className="p-4 space-x-2">
            <button type="button" data-modal-toggle="user-modal " className="text-white bg-blue-600 hover:bg-blue-700 outline-none font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center" onClick={editUser}>
                <FontAwesomeIcon icon={faPenToSquare} className="mr-2 h-5 w-5 text-lg"/>
                Editer
            </button>
            <button type="button" data-modal-toggle="delete-user-modal" className="text-white bg-red-600 outline-none hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center" onClick={removeUser}>
                <FontAwesomeIcon icon={faTrashCan} className="mr-2 h-5 w-5 text-lg"/>
                Supprimer
            </button>
        </td>
    </tr>
  )
}

export default AccountItem;