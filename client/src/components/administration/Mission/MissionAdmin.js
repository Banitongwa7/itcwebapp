import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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

    let fetchMission = async () => {
        let resp = await fetch("http://127.0.0.1:8000/api/mission/", {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            })

        let data = await resp.json()

        if (resp.status === 200)
        {
            setMissions(data)
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



    let displayMission = missions.map((item, index) => (
        <ItemMission key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
    ))

    let searchBarMission = missions.filter((item) => item.description.toLowerCase().includes(query)).map((item, index) => (
        <ItemMission key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
    ))


  return (
    <section className="m-4 ">
    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
            <div className="sm:flex mt-4">


                {/*Search Bar Mission*/}
                <SearchBarMission setQuery={setQuery} />

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
                                <th scope="col" className="p-4 text-xs text-center font-medium text-gray-500 uppercase">
                                    Derniére modification
                                </th>
                                <th scope="col" className="p-4 text-xs text-center font-medium text-gray-500 uppercase">
                                    Date d'ajout
                                </th>
                                <th scope="col" className="p-4 text-xs text-center font-medium text-gray-500 uppercase">
                                    Action
                                </th>
                            </tr>
                        </thead>


                        <tbody className="bg-white divide-y divide-gray-200">

                            {/*<!-- Item -->*/}
                            {
                                query ? (searchBarMission) : (displayMission)
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