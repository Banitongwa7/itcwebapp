import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

const ItemOpportunity = ({item, select, setSelect, setEditmodal, setRemovemodal}) => {

  let [user, setUser] = useState(null)
  let [data, setData] = useState(null)

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
        setData(re)
    }

  }
  console.log(item)



  // Get User qualification
  let fetchUser = async () => {
    let formdata = new FormData();
    formdata.append('id', item.userqualification)
    let resp = await fetch("http://127.0.0.1:8000/api/qualification/userqualification/", {
            method: 'POST',
            body:formdata
        })

    let re = await resp.json()

    if (resp.status === 200)
    {
      setUser(re)
    }

  }

  useEffect(() => {
    fetchData()
    fetchUser()
  }, [])





  // Convert date django for date qualification
  //let first = new Date(item.datequalification)
  //let date = first.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})

  // Convert date django for data qualification
  //let second = new Date(data.datescraping)
  //let datescrap = second.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})







  return (
    <div class="m-10">
        <div class="w-full">
            <div class=" shadow-md border border-gray-400 bg-white rounded-sm py-4 flex flex-col justify-between leading-normal">
                <div class="mb-8 px-4">
                    <p class="text-sm text-gray-600 flex items-center justify-between">
                        <span className="text-sm text-gray-700 font-light">Qualifier par user.full_name </span>
                        <span class="bg-green-500 rounded-2xl p-1 text-white shadow-lg font-medium">Opportunity</span>
                    </p>
                    {data.titre ? (<div className="text-sm font-semibold text-gray-900 mb-2">data.titre</div>) : (<div className="text-sm font-semibold text-red-900 mb-2">Site exclu de scraping</div>)}
                    <p class="text-gray-800 text-base text-justify">{data.content}. <span className='italic text-sm text-gray-900 font-medium'>Scrapé le datescrap</span></p>
                </div>
                <div class="flex items-center bg-blue-100 shadow-inner flex-col">
                    <div class="text-sm space-y-3 p-4">
                        <p class="text-gray-900 leading-none"><span class="font-bold text-gray-700 uppercase">Type d'opportunité</span> : {/*item.typeopportunity ? (item.typeopportunity) : ("N'est pas mentionné")*/}</p>
                        <p class="text-gray-900 leading-none"><span class="font-bold text-gray-700 uppercase">Proposition</span> : {/*item.proposition ? (item.proposition) : ("N'est pas mentionné")*/}</p>
                        <p class="text-gray-900 leading-none"><span class="font-bold text-gray-700 uppercase">Date de qualification</span> : date</p>
                    </div>
                </div>
                <div class="flex justify-between">
                    <div></div>
                    <div class="space-x-2">
                        <button type="button" class="text-blue-900 hover:text-blue-600 outline-none hover:scale-110 transform font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center" onClick={handleEdit}>
                            <FontAwesomeIcon className='mr-2 h-5 w-5 text-lg' icon={faPencil} />
                        </button>
                        <button type="button" class="text-red-900 outline-none hover:scale-110 transform hover:text-red-500 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center" onClick={handleRemove}>
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