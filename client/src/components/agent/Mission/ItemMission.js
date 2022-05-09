import React from 'react'

const ItemMission = ({item}) => {






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

    </tr>
  )
}

export default ItemMission;