import React from 'react';

const ItemLog = ({item}) => {


    // Convert date django for react
    let datetime = new Date(String(item.time).split(",")[0])
    let date = datetime.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})
    let time = datetime.toLocaleString('fr-FR', {hour: 'numeric', minute: 'numeric'})


  return (
    <li className="mb-10 ml-6">
      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white">
          <svg className="w-3 h-3 text-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
      </span>
      { item.info == "ERROR" ? (<h3 className="mb-1 text-md font-semibold text-red-800">{item.info}</h3>) : (<h3 className="mb-1 text-md font-semibold text-gray-800">{item.info}</h3>)}
      <time className="block mb-2 text-sm font-medium leading-none text-sky-800">Détecté le {date} à {time}</time>
      <p className="text-base font-normal text-gray-700">{item.message}</p>
    </li>
  )
}


export default ItemLog;