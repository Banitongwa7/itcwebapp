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
      if (result.length === 2)
      {
          send = result[1]
      }else{
          send = result[0]
      }


      // calcul parcent by site
      let val = item.number * 1
      let percent = val ? (Math.round((val * 100) / total)) : (0)

  return (
    <tr className="text-gray-900">

        <th className="border-t-0 align-middle text-sm font-normal pl-4 py-4 text-left truncate w-[30%]">
            <Link to={"//" + send} target="_blank" className="text-blue-800 underline">{item.description}</Link>
        </th>

        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
            <div className="flex items-center">
                <span className="mr-2 text-xs font-medium">{val}</span>
                <div className="w-full bg-gray-300 rounded-full">
                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: String(percent) + "%"}}>{String(percent) + "%"}</div>
                </div>
            </div>
        </td>

        <td className="py-3 px-2 text-center">
            <div className="flex item-center justify-center">
                <div className="w-4 mr-2 text-red-800 transform hover:text-red-500 hover:scale-110 cursor-pointer" onClick={removeWebsite}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>
            </div>
        </td>

    </tr>
  )
}

export default ItemOfferStat;