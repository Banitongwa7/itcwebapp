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

    let searchBarCredential = credentials.filter((item) => item.proposition.toLowerCase().includes(query)).map((item, index) => (
        <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
    ))

    // Function trie of elements
    let renderElement = (val) => {

        // Trie by code
        if (val === "code"){
            const codeID = document.querySelector("#code")
            codeID.classList.toggle("code")
            if (codeID.classList.contains("code"))
            {
                let codeTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = codeTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }else{
                let codeTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = codeTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }

        }

        // Trie by type
        if (val === "type"){

            const typeID = document.querySelector("#type")
            typeID.classList.toggle("type")
            if (typeID.classList.contains("type"))
            {
                let typeTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = typeTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }else{
                let typeTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = typeTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }


        }

        //Trie by montant
        if (val === "montant"){
            const montantID = document.querySelector("#montant")
            montantID.classList.toggle("montant")
            if (montantID.classList.contains("montant"))
            {
                let montantTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = montantTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }else{
                let montantTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = montantTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }
        }

        //Trie by dure
        if (val === "dure"){
            const dureID = document.querySelector("#dure")
            dureID.classList.toggle("dure")
            if (dureID.classList.contains("dure"))
            {
                let dureTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = dureTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }else{
                let dureTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = dureTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }
        }

        //Trie by contact
        if (val === "contact"){
            const contactID = document.querySelector("#contact")
            contactID.classList.toggle("contact")
            if (contactID.classList.contains("contact"))
            {
                let contactTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = contactTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }else{
                let contactTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = contactTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }
        }

           //Trie by team
        if (val === "team"){
            const teamID = document.querySelector("#team")
            teamID.classList.toggle("team")
            if (teamID.classList.contains("team"))
            {
                let teamTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = teamTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }else{
                let teamTrie = credentials.sort((a, b) => {
                    return -1
                })

                let dataTrie = teamTrie.map((item, index) => (
                    <ItemCredential key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarCredential) : (dataTrie)
            }
        }

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

                    {/*<!-- search bar -->*/}
                    <SearchBarCredential setQuery={setQuery} />


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
                                    <th className="text-xs p-2 text-center cursor-pointer" onClick={()=>setTrie(trie = "code")} id="code">Code <FontAwesomeIcon icon={faArrowDownLong} className="text-sky-700"/><FontAwesomeIcon icon={faArrowUpLong} className="text-sky-700"/></th>
                                    <th className="text-xs p-2 text-center cursor-pointer" onClick={()=>setTrie(trie = "type")} id="type">Type <FontAwesomeIcon icon={faArrowDownLong} className="text-sky-700"/><FontAwesomeIcon icon={faArrowUpLong} className="text-sky-700"/></th>
                                    <th className="p-2 text-xs text-center cursor-pointer" onClick={()=>setTrie(trie = "montant")} id="montant">Montant <FontAwesomeIcon icon={faArrowDownLong} className="text-sky-700"/><FontAwesomeIcon icon={faArrowUpLong} className="text-sky-700"/></th>
                                    <th className="p-2 text-xs text-center cursor-pointer" onClick={()=>setTrie(trie = "dure")} id="dure">Durée <FontAwesomeIcon icon={faArrowDownLong} className="text-sky-700"/><FontAwesomeIcon icon={faArrowUpLong} className="text-sky-700"/></th>
                                    <th className="p-2 text-xs text-center cursor-pointer" onClick={()=>setTrie(trie = "contact")} id="contact">Contact Client <FontAwesomeIcon icon={faArrowDownLong} className="text-sky-700"/><FontAwesomeIcon icon={faArrowUpLong} className="text-sky-700"/></th>
                                    <th className="p-2 text-xs text-center cursor-pointer" onClick={()=>setTrie(trie = "team")} id="team">Equipe <FontAwesomeIcon icon={faArrowDownLong} className="text-sky-700"/><FontAwesomeIcon icon={faArrowUpLong} className="text-sky-700"/></th>
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
