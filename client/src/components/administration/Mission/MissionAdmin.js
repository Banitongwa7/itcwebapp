import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowDownLong, faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import ItemMission from './ItemMission';
import AddMissionModal from './../Modal/AddMissionModal';
import EditerMissionModal from './../Modal/EditerMissionModal';
import RemoveMissionModal from './../Modal/RemoveMissionModal';
import SearchBarMission from './SearchBarMission';

const MissionAdmin = () => {
    let [missions, setMissions] = useState([])
    let [query, setQuery] = useState("")
    // Select Mission
    let [select, setSelect] = useState(null)

    // display or hidden modal
    let [addmodal, setAddmodal] = useState(false)
    let [editmodal, setEditmodal] = useState(false)
    let [removemodal, setRemovemodal] = useState(false)

    // fetch when we add something
    let [newItem, setNewItem] = useState(false)

    // Hooks of trie
    let [trie, setTrie] = useState("")

    let fetchMission = async () => {
        let resp = await fetch("http://127.0.0.1:8000/api/mission/", {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            })

        let result = await resp.json()

        if (resp.status === 200)
        {
            setMissions(result)
        }

        if (newItem)
        {
            setNewItem(newItem = false)
        }

    }


    useEffect(() => {
        fetchMission()
    }, [])


    
    useEffect(() => {
        fetchMission()
    }, [newItem])


    // display mission
    let displayMission = missions.map((item, index) => (
        <ItemMission key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
    ))
    
    // display mission search bar
    let searchBarMission = missions.filter((item) => item.description.toLowerCase().includes(query)).map((item, index) => (
        <ItemMission key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
    ))


    // function trie : update and ajout
    let renderElement = (val) => {

        // update
        if(val === "maj" )
        {
            const majID = document.querySelector("#maj")
            majID.classList.toggle("maj")
            if (majID.classList.contains("maj"))
            {
                let majTrie = missions.sort((a, b) => {
                    let first = new Date(a.lastupdate)
                    let second = new Date(b.lastupdate)
                    return first - second
                })

                let dataTrie = majTrie.map((item, index) => (
                    <ItemMission key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarMission) : (dataTrie)
            }else{
                let majTrie = missions.sort((a, b) => {
                    let first = new Date(a.lastupdate)
                    let second = new Date(b.lastupdate)
                    return second - first
                })

                let dataTrie = majTrie.map((item, index) => (
                    <ItemMission key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarMission) : (dataTrie)
            }
        }
        
        // ajout
        if (val === "ajout")
        {
            const ajoutID = document.querySelector("#ajout")
            ajoutID.classList.toggle("ajout")
            if (ajoutID.classList.contains("ajout"))
            {
                let ajoutTrie = missions.sort((a, b) => {
                    let first = new Date(a.datemission)
                    let second = new Date(b.datemission)
                    return first - second
                })

                let dataTrie = ajoutTrie.map((item, index) => (
                    <ItemMission key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarMission) : (dataTrie)
            }else{
                let ajoutTrie = missions.sort((a, b) => {
                    let first = new Date(a.datemission)
                    let second = new Date(b.datemission)
                    return second - first
                })

                let dataTrie = ajoutTrie.map((item, index) => (
                    <ItemMission key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarMission) : (dataTrie)
            }
        }

        return query ? (searchBarMission) : (displayMission)
    }



  return (
    <section className="m-4 ">
    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
            <div className="sm:flex mt-4">

                {/*<!-- Filter and search -->*/}
                <div className="my-2 flex sm:flex-row flex-col">
                    {/*Search Bar Mission*/}
                    <SearchBarMission setQuery={setQuery} />
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <button type="button" className="w-1/2 text-white bg-blue-600 hover:bg-blue-700 outline-none font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto" onClick={(e)=>setAddmodal(true)}>
                        <FontAwesomeIcon  className="-ml-1 mr-2 h-6 w-6" icon={faPlus} />
                        Add Mission
                    </button>
                </div>
                
            </div>
        </div>
    </div>

    <div className="flex flex-col">
        <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden">


                    <table className="table-fixed w-full divide-y border divide-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="p-4 w-[40%] text-center text-xs font-medium text-gray-500 uppercase">
                                    Description
                                </th>
                                <th scope="col" className="p-4 text-xs text-center font-medium text-gray-500 uppercase cursor-pointer" onClick={()=>setTrie(trie = "maj")} id="maj">
                                    Derniére modification <FontAwesomeIcon icon={faArrowDownLong} className="text-sky-700"/><FontAwesomeIcon icon={faArrowUpLong} className="text-sky-700"/>
                                </th>
                                <th scope="col" className="p-4 text-xs text-center font-medium text-gray-500 uppercase cursor-pointer" onClick={()=>setTrie(trie = "ajout")} id="ajout">
                                    Date d'ajout <FontAwesomeIcon icon={faArrowDownLong} className="text-sky-700"/><FontAwesomeIcon icon={faArrowUpLong} className="text-sky-700"/>
                                </th>
                                <th scope="col" className="p-4 text-xs text-center font-medium text-gray-500 uppercase">
                                    Action
                                </th>
                            </tr>
                        </thead>


                        <tbody className="bg-white divide-y divide-gray-200">


                            {/*<!-- Item -->*/}
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
        addmodal && <AddMissionModal setAddmodal={setAddmodal} setNewItem={setNewItem} newItem={newItem}/>
    }


    {/* Edit Mission Modal */}
    {
        editmodal && <EditerMissionModal select={select} setEditmodal={setEditmodal} setNewItem={setNewItem} newItem={newItem}/>
    }

    
    {/* Remove Mission Modal */}
    {
        removemodal && <RemoveMissionModal select={select} setRemovemodal={setRemovemodal} missions={missions} setMissions={setMissions} setNewItem={setNewItem} newItem={newItem}/>
    }


</section>
  )
}

export default MissionAdmin;