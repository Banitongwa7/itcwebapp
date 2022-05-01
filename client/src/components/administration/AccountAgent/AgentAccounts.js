import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AccountItem from './AccountItem';

import AddAgentModal from './../Modal/AddAgentModal';
import EditerAgentModal from './../Modal/EditerAgentModal';
import RemoveAgentModal from './../Modal/RemoveAgentModal';
import SearchBarAgent from './SearchBarAgent';

const AgentAccounts = () => {
    // all agents
    let [agents, setAgents] = useState([])
    // Select agent
    let [select, setSelect] = useState(null)
    // Search Bar
    let [query, setQuery] = useState("")

    // display or hidden modal
    let [addmodal, setAddmodal] = useState(false)
    let [editmodal, setEditmodal] = useState(false)
    let [removemodal, setRemovemodal] = useState(false)

    // fetch when we add something
    let [newItem, setNewItem] = useState(false)

    let fetchAgents = async () => {
        let resp = await fetch("http://127.0.0.1:8000/api/agent/", {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            })
        let data = await resp.json()
        if (resp.status === 200)
        {
            setAgents(data)
        }

        if (newItem)
        {
            setNewItem(newItem = false)
        }
    }

    useEffect(() => {

        fetchAgents()

    }, [])

    useEffect(() => {

        fetchAgents()

    }, [newItem])

        // display all agents
    let displayAgents = agents.map((agent, index) => (
        <AccountItem key={index} agent={agent} setSelect={setSelect} setRemovemodal={setRemovemodal} setEditmodal={setEditmodal}/>
    ))

        // search agent
    let searchBar = agents.filter((item) => item.full_name.toLowerCase().includes(query)).map((agent, index) => (
        <AccountItem key={index} agent={agent} setSelect={setSelect} setRemovemodal={setRemovemodal} setEditmodal={setEditmodal}/>
    ))

  return (
    <section className="m-4 ">
    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
            {/*<!-- add agent and search -->*/}
            <div className="my-2 justify-between flex sm:flex-row flex-col">

                {/*<!-- search bar -->*/}
                <SearchBarAgent setQuery={setQuery} />

                {/*<!-- add agent -->*/}
                <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <button type="button" data-modal-toggle="add-user-modal" className="w-1/2 text-white bg-blue-600 hover:bg-blue-700 outline-none font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto" onClick={() => {setAddmodal(true)}}>
                        <FontAwesomeIcon icon={faPlus} className="p-1"/>
                        Add user
                    </button>
                </div>
            </div>

        </div>

    </div>

    <div className="flex flex-col">
        <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
                <div >

                    <table className="min-w-full divide-y border divide-gray-300">
                        <thead className="bg-gray-100">
                            <tr className="text-center">
                                <th></th>
                                <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                                    Nom complet
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                                    E-mail
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                                    Numero de téléphone
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">

                            {
                                query ? (searchBar) : (displayAgents)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    {/* Add agent Modal */}
    {
        addmodal && <AddAgentModal setAddmodal={setAddmodal} setNewItem={setNewItem} newItem={newItem}/>
    }


    
    {/* Edit agent Modal */}
    {
        editmodal && <EditerAgentModal select={select} setEditmodal={setEditmodal} setNewItem={setNewItem} newItem={newItem}/>
    }
    
    
    {/* Remove agent Modal */}
    {
        removemodal && <RemoveAgentModal select={select} setRemovemodal={setRemovemodal} setAgents={setAgents} agents={agents}/>
    }


</section>
  )
}

export default AgentAccounts;