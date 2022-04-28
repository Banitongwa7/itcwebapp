import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ItemOfferStat = ({setRemoveWebsiteModal, item, setSelect, total}) => {


    let removeWebsite = () => {
        setSelect(item)
        setRemoveWebsiteModal(true)
    }

      // Transform url : Remove https or http in url
      let url = String(item.url)
      let result = url.split("//")
      let send = ""
      if (result.length == 2)
      {
          send = result[1]
      }else{
          send = result[0]
      }


      // calcul parcent by site
      let val = item.number * 1
      let percent = (val * 100) / total

  return (
    <tr className="text-gray-900">

        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
            <Link to={"//" + send} target="_blank" className="text-blue-800 underline">{item.description}</Link>
        </th>

        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
            <div className="flex items-center">
                <span className="mr-2 text-xs font-medium">{val}</span>
                <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: String(percent) + "%"}}>{String(percent) + "%"}</div>
                </div>
            </div>
        </td>

        <td className="border-t-0 px-4 align-middle text-xs text-center">
            <button type="button" className="text-white bg-red-600 outline-none hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2" onClick={removeWebsite}>
                <FontAwesomeIcon icon={faTrashCan} className="mr-2 h-5 w-5 text-lg"/>
                Supprimer
            </button>
        </td>

    </tr>
  )
}

export default ItemOfferStat;