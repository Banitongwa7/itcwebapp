import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ItemOpportunity = ({item, data, select, setSelect, setEditmodal, setRemovemodal}) => {

  let [user, setUser] = useState({})
  let [datascrap, setDatascrap] = useState({})

  // Remove Opportunity
  let handleRemove = () =>{
    setSelect(select = item)
    setRemovemodal(true)
  }

  // Edit Opportunity
  let handleEdit = () =>{
    setSelect(select = item)
    setEditmodal(true)
  }

  // Get data scraper qualification

  let fetchData = async () => {
    let formdata = new FormData();
    formdata.append('id', item.datareference)

    let resp = await fetch("http://127.0.0.1:8000/api/qualification/dataqualification/", {
            method: 'POST',
            body:formdata
        })

    let re = await resp.json()

    if (resp.status === 200)
    {
      setDatascrap(re)
    }

  }


  // Get User qualification
  let fetchUser = async () => {
    let formdata = new FormData();
    formdata.append('id', item.userqualification)
    let resp = await fetch("http://127.0.0.1:8000/api/qualification/userqualification/", {
            method: 'POST',
            body:formdata
        })

    let res = await resp.json()

    if (resp.status === 200)
    {
      setUser(res)
    }

  }




  // Convert date django for date qualification
  let first = new Date(item.datequalification)
  let date = first.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})

  // Convert date django for data qualification
  let second = new Date(datascrap.datescraping)
  let dates = second.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})


  // Transform url : Remove https or http in url
  let url = String(datascrap.urldata)
  let result = url.split("//")
  let send = ""
  if (result.length == 2)
  {
      send = result[1]
  }else{
      send = result[0]
  }


  useEffect(() => {
    fetchData()
    fetchUser()
  }, [data])




  return (
    <div className="mx-10 mb-10 mt-5">
        <div className="w-full">
            <div className=" shadow-md border border-gray-400 bg-white rounded-sm py-4 flex flex-col justify-between leading-normal">
                <div className="mb-8 px-4">
                    <p className="text-sm text-gray-600 flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 font-medium"><FontAwesomeIcon className='text-lg mr-5' icon={faUserTie}/>Qualifier par {user.full_name} </span>
                        <span className="bg-green-500 rounded-2xl p-1 text-white shadow-lg font-medium">Opportunity</span>
                    </p>
                    {datascrap.titre ? (<div className="text-sm font-semibold text-gray-900 mb-2">{datascrap.titre}</div>) : (<div className="text-sm font-semibold text-red-900 mb-2">Site exclu de scraping</div>)}
                    <Link to={"//" + send} className="text-gray-800 text-base hover:underline hover:text-blue-700 text-justify" target="_blank" rel="noopener noreferrer">{datascrap.content}. <span className='italic text-sm text-gray-900 font-medium'>Scrapé le {dates}</span></Link>
                </div>
                <div className="flex items-center bg-blue-100 shadow-inner ">
                    <div className="text-sm space-y-3 p-4">
                        <p className="text-gray-900 leading-none"><span className="font-bold text-gray-700 uppercase">Type d'opportunité</span> : {item.typeopportunity ? (item.typeopportunity) : ("N'est pas mentionné")}</p>
                        <p className="text-gray-900 leading-none"><span className="font-bold text-gray-700 uppercase">Proposition</span> : {item.proposition ? (item.proposition) : ("N'est pas mentionné")}</p>
                        <p className="text-gray-900 leading-none"><span className="font-bold text-gray-700 uppercase">Date de qualification</span> : {date}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div></div>
                    <div className="space-x-2">
                        <button type="button" className="text-blue-900 hover:text-blue-600 outline-none hover:scale-110 transform font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center" onClick={handleEdit}>
                            <FontAwesomeIcon className='mr-2 h-5 w-5 text-lg' icon={faPencil} />
                        </button>
                        <button type="button" className="text-red-900 outline-none hover:scale-110 transform hover:text-red-500 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center" onClick={handleRemove}>
                            <FontAwesomeIcon className='mr-2 h-5 w-5 text-lg' icon={faTrashCan} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemOpportunity;