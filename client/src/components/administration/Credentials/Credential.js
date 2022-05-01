import React, { useState, useEffect } from 'react';
import ItemCredential from './ItemCredential';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddCredentialModal from './../Modal/AddCredentialModal';
import EditerCredentialModal from './../Modal/EditerCredentialModal';
import RemoveCredentialModal from './../Modal/RemoveCredentialModal';



const Credential = () => {
  let [credentials, setCredentials] = useState([])
  //search credential
  let [query, setQuery] = useState("")
  // Select credential
  let [select, setSelect] = useState(null)

  // display or hidden modal
  let [addmodal, setAddmodal] = useState(false)
  let [editmodal, setEditmodal] = useState(false)
  let [removemodal, setRemovemodal] = useState(false)

  // fetch when we add something
  let [newItem, setNewItem] = useState(false)

    let fetchCredentials = async () => {
        let resp = await fetch("http://127.0.0.1:8000/api/credential/", {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            })

        let data = await resp.json()

        if (resp.status === 200)
        {
            setCredentials(data)
        }

        if (newItem)
        {
            setNewItem(newItem = false)
        }

    }


    useEffect(() => {
      fetchCredentials()
    }, [])


    
    useEffect(() => {
      fetchCredentials()
    }, [newItem])



    let displayCredential = credentials.map((item, index) => (
        <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
    ))

    let searchBarCredential = credentials.filter((item) => item.type.toLowerCase().includes(query)).map((item, index) => (
        <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
    ))



    /*


    <div className="flex flex-col">
        <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden">


                    <table className="table-fixed  min-w-max w-full border divide-gray-300">
                        <thead className="bg-gray-100">


                            <tr>
                                <th scope="col" className="p-4 text-xs text-left font-medium text-gray-500 uppercase">
                                    Type
                                </th>
                                <th scope="col" className="p-4 text-xs text-left font-medium text-gray-500 uppercase">
                                    Montant
                                </th>
                                <th scope="col" className="p-4 text-xs text-left font-medium text-gray-500 uppercase">
                                    Durée
                                </th>
                                <th scope="col" className="p-4 text-xs text-left font-medium text-gray-500 uppercase">
                                    Contact Client
                                </th>
                                <th scope="col" className="p-4 text-xs text-left font-medium text-gray-500 uppercase">
                                    Equipe
                                </th>
                                <th scope="col" className="p-4 text-xs text-left font-medium text-gray-500 uppercase">
                                    Proposition
                                </th>
                                <th scope="col" className="p-4 text-xs text-left font-medium text-gray-500 uppercase">
                                    Rapport final
                                </th>
                                <th scope="col" className="p-4 text-xs text-left font-medium text-gray-500 uppercase">
                                    Derniére modification
                                </th>
                                <th scope="col" className="p-4 text-xs text-left font-medium text-gray-500 uppercase">
                                    Date d'ajout
                                </th>
                                <th scope="col" className="p-4 text-xs text-center font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>


                        </thead>


                        <tbody className="bg-white divide-y divide-gray-200">


                            {
                                query ? (searchBarCredential) : (displayCredential)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    */


  return (
    <section className="mt-4 ml-2 mr-2">
    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200">
        <div className="mb-1 w-full">
            <div className="sm:flex ">
                <div className="sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                        <div className="mt-1 relative lg:w-64 xl:w-96">
                            <input type="text" name="searchname" id="users-search"
                                className="bg-gray-50 border border-gray-400 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                placeholder="Recherche ..." onChange={(e)=>setQuery(e.target.value)}/>
                        </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <button type="button" className="w-1/2 text-white bg-blue-600 hover:bg-blue-700 outline-none font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto" onClick={(e)=>setAddmodal(true)}>
                        <FontAwesomeIcon  className="-ml-1 mr-2 h-6 w-6" icon={faPlus} />
                        Add Credential
                    </button>
                </div>
            </div>
        </div>

    </div>



    <div className="flex flex-col">
        <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                    <div className="overflow-hidden">
                        <table className="w-full border divide-gray-300 table-fixed">
                            <thead>


                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                                    <th className="text-xs p-2 text-center">Type</th>
                                    <th className="p-2 text-xs text-center">Montant</th>
                                    <th className="p-2 text-xs text-center">Durée</th>
                                    <th className="p-2 text-xs text-center">Contact Client</th>
                                    <th className="p-2 text-xs text-center">Equipe</th>
                                    <th className="p-2 text-xs text-center">Proposition</th>
                                    <th className="p-2 text-xs text-center">Rapport final</th>
                                    <th className="p-2 text-xs text-center">Derniére modification</th>
                                    <th className="p-2 text-xs text-center">Date d'ajout</th>
                                    <th className="p-2 text-xs text-center">Actions</th>
                                </tr>


                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">


                            {
                                query ? (searchBarCredential) : (displayCredential)
                            }


                            </tbody>
                        </table>
                    </div>
                </div>
           
        </div>
        </div>
  



    {/* Add Mission Modal */}
    {
        addmodal && <AddCredentialModal setAddmodal={setAddmodal} setNewItem={setNewItem} newItem={newItem}/>
    }


    {/* Edit Mission Modal */}
    {
        editmodal && <EditerCredentialModal select={select} setEditmodal={setEditmodal} setNewItem={setNewItem} newItem={newItem}/>
    }

    
    {/* Remove Mission Modal */}
    {
        removemodal && <RemoveCredentialModal select={select} setRemovemodal={setRemovemodal} credentials={credentials} setCredentials={setCredentials} setNewItem={setNewItem} newItem={newItem}/>
    }


</section>
  )
}

export default Credential;
