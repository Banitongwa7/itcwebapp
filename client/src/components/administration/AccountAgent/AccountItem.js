import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';


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
        <td className="py-3 px-2 text-center">
            <div className="flex item-center justify-center">
                <div className="w-4 mr-5 transform text-blue-800 hover:text-blue-500 hover:scale-110 cursor-pointer" onClick={editUser}>
                    <FontAwesomeIcon icon={faPencil} />
                </div>
                <div className="w-4 mr-2 text-red-800 transform hover:text-red-500 hover:scale-110 cursor-pointer" onClick={removeUser}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>
            </div>
        </td>
    </tr>
  )
}

export default AccountItem;