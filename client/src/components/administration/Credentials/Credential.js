import React, { useState, useEffect } from 'react';
import ItemCredential from './ItemCredential';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowDownLong, faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import AddCredentialModal from './../Modal/AddCredentialModal';
import EditerCredentialModal from './../Modal/EditerCredentialModal';
import RemoveCredentialModal from './../Modal/RemoveCredentialModal';
import SearchBarCredential from './SearchBarCredential';



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

  // Hooks of trie
  let [trie, setTrie] = useState("")
  let [field, setField] = useState("")
  let [trieField, setTrieField] = useState(["Code", "Type", "Montant", "Duree", "Contact client", "Equipe", "Proposition", "Rapport final"])

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


    let searchBarCredential = credentials.filter((item) => item.codecredential.includes(query)).map((item, index) => (
        <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
    ))

     // trie by field
     if (field === "Type")
     {
         searchBarCredential = credentials.filter((item) => item.type.includes(query)).map((item, index) => (
             <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
         ))
     }

     if (field === "Montant")
     {
         searchBarCredential = credentials.filter((item) => item.montant.includes(query)).map((item, index) => (
             <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
         ))
     }

     if (field === "Duree")
     {
         searchBarCredential = credentials.filter((item) => item.duree.includes(query)).map((item, index) => (
             <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
         ))
     }

     if (field === "Contact client")
     {
         searchBarCredential = credentials.filter((item) => item.contactclient.includes(query)).map((item, index) => (
             <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
         ))
     }

     if (field === "Equipe")
     {
         searchBarCredential = credentials.filter((item) => item.equipe.includes(query)).map((item, index) => (
             <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
         ))
     }


     if (field === "Proposition")
     {
         searchBarCredential = credentials.filter((item) => item.proposition.includes(query)).map((item, index) => (
             <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
         ))
     }

     if (field === "Rapport final")
     {
         searchBarCredential = credentials.filter((item) => item.rapportfinal.includes(query)).map((item, index) => (
             <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
         ))
     }


    // Function trie of elements
    let renderElement = (val) => {

        //Trie by update
        if (val === "maj"){
            const majID = document.querySelector("#maj")
            majID.classList.toggle("maj")
            if (majID.classList.contains("maj"))
            {
                let majTrie = credentials.sort((a, b) => {
                    let first = new Date(a.lastupdate)
                    let second = new Date(b.lastupdate)
                    return first - second
                })

                let dataTrie = majTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }else{
                let majTrie = credentials.sort((a, b) => {
                    let first = new Date(a.lastupdate)
                    let second = new Date(b.lastupdate)
                    return second - first
                })

                let dataTrie = majTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }
        }

        // Trie by add item
        if (val === "ajout"){
            const ajoutID = document.querySelector("#ajout")
            ajoutID.classList.toggle("ajout")
            if (ajoutID.classList.contains("ajout"))
            {
                let ajoutTrie = credentials.sort((a, b) => {
                    let first = new Date(a.lastupdate)
                    let second = new Date(b.lastupdate)
                    return first - second
                })

                let dataTrie = ajoutTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }else{
                let ajoutTrie = credentials.sort((a, b) => {
                    let first = new Date(a.lastupdate)
                    let second = new Date(b.lastupdate)
                    return second - first
                })

                let dataTrie = ajoutTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }
        }

        return query ? (searchBarCredential) : (displayCredential)
    }


  return (
    <section className="mt-4 ml-2 mr-2">
    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200">
        <div className="mb-1 w-full">
            <div className="sm:flex ">

                <div class="my-2 flex sm:flex-row flex-col">
                    <div class="flex flex-row mb-1 sm:mb-0">
                        <div class="relative">
                            <select class="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-l rounded-l border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500" onChange={e => setField(field = trieField[e.target.value])}>
                                {
                                    trieField.map((item, key) => <option value={key}>{item}</option>)
                                }
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <SearchBarCredential setQuery={setQuery} />
                    
                </div>

                    {/*<!-- search bar --> */}
                    


                <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <button type="button" className="w-1/2 text-white bg-blue-600 hover:bg-blue-700 outline-none font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto" onClick={()=>setAddmodal(true)}>
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
                                    <th className="text-xs p-2 text-center">Code</th>
                                    <th className="text-xs p-2 text-center">Type</th>
                                    <th className="p-2 text-xs text-center">Montant</th>
                                    <th className="p-2 text-xs text-center">Durée</th>
                                    <th className="p-2 text-xs text-center">Contact Client</th>
                                    <th className="p-2 text-xs text-center">Equipe</th>
                                    <th className="p-2 text-xs text-center">Proposition</th>
                                    <th className="p-2 text-xs text-center">Rapport final</th>
                                    <th className="p-2 text-xs text-center cursor-pointer" onClick={()=>setTrie(trie = "maj")} id="maj">Derniére modification <FontAwesomeIcon icon={faArrowDownLong} className="text-sky-700"/><FontAwesomeIcon icon={faArrowUpLong} className="text-sky-700"/></th>
                                    <th className="p-2 text-xs text-center cursor-pointer" onClick={()=>setTrie(trie = "ajout")} id="ajout">Date d'ajout <FontAwesomeIcon icon={faArrowDownLong} className="text-sky-700"/><FontAwesomeIcon icon={faArrowUpLong} className="text-sky-700"/></th>
                                    <th className="p-2 text-xs text-center">Actions</th>
                                </tr>


                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">


                            {
                                renderElement(trie)
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
