import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import Context from './../../../context/Context';

const ItemOffer = ({item}) => {

    let {admin} = useContext(Context)
    let [message, setMessage] = useState("")

    // Transform url : Remove https or http in url
    let url = String(item.urldata)
    let result = url.split("//")
    let send = ""
    if (result.length === 2)
    {
        send = result[1]
    }else{
        send = result[0]
    }

    // Convert date django
    let first = new Date(item.datescraping)
    let datescraping = first.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})


    // Add opportunity
    let addOpportunity = async (e) => {

      e.preventDefault();
      let formdata = new FormData();

      console.log(item)

      formdata.append('datareference', item.id)
      formdata.append('userqualification', admin.user_id)
      formdata.append('isopportunity', 1)

      let resp = await fetch('http://127.0.0.1:8000/api/qualification/', {
          method: 'POST',
          body:formdata
      })

      let data = await resp.json()

      if (data !== 200)
      {
          setMessage("Cette qualification existe déjà");
      }else{
          alert("Votre qualification a reussie !");
      }
  }




  return (
    <div className="rounded-md w-full bg-white border-gray-250 border mb-5 pb-4 shadow-lg px-4 py-4 transition transform duration-500">
    {/*<!-- Afficher Message d'erreur -->*/}
    <p className="text-xs italic text-red-500 w-full">{message}</p>
     <form action="#" method="post">

      <div className="flex flex-col justify-start">
        <div className="flex justify-between items-center w-full mb-3">
          <div className="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2">
              {/*company icone */}
            <FontAwesomeIcon className="w-7 h-7 text-gray-700" icon={faBuilding} />
            <span>{item.titre ? (<span className="text-sm font-semibold text-gray-900 mb-1">{item.titre}</span>) : (<span className="text-sm font-semibold text-red-900 mb-1">Site exclu de scraping</span>)}</span>
          </div>
          <span className="text-sm font-normal text-gray-700 px-4 py-1 shadow-sm">Scrapé le {datescraping}</span>
        </div>

        <div className="text-sm text-gray-500 flex space-x-1 items-center">
          {/*offer icone */}
          <FontAwesomeIcon className="w-6 h-6 text-indigo-700" icon={faBullhorn} />

          <Link to={"//" + send} className="text-blue-700 text-sm  inline-flex items-center font-semibold tracking-wide w-[90%]" target="_blank" rel="noopener noreferrer">
              <span className='hover:underline'>{item.content}</span>
          </Link>
        </div>
        <div>
          <div className="mt-5 flex justify-end">
            <button type='button' className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:border-green-600 hover:bg-green-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer" onClick={addOpportunity}>Opportunité</button>
          </div>
        </div>
      </div>

    </form>
  </div>
  )
}

export default ItemOffer;