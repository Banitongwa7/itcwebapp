import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AccountItem from './AccountItem';

import AddAgentModal from './Modal/AddAgentModal';
import EditerAgentModal from './Modal/EditerAgentModal';
import RemoveAgentModal from './Modal/RemoveAgentModal';

const AgentAccounts = () => {

    let [agents, setAgents] = useState([])
    let [select, setSelect] = useState(null)

    let [addmodal, setAddmodal] = useState(false)
    let [editmodal, setEditmodal] = useState(false)
    let [removemodal, setRemovemodal] = useState(false)

    let fetchAgents = async () => {
        let resp = await fetch("http://127.0.0.1:8000/api/agent/", {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            })
        let data = await resp.json()
        setAgents(data)
    }

    useEffect(() => {
        fetchAgents()
    }, [])



  return (
    <section className="m-4 ">
    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
            <div className="sm:flex mt-4">
                <div className="sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                    <form className="lg:pr-3" action="#" method="GET">
                        <div className="mt-1 relative lg:w-64 xl:w-96">
                            <input type="text" name="searchname" id="users-search" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Recherche ..."/>
                        </div>
                    </form>
                </div>
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
                <div className="overflow-hidden">


                    <table className="table-fixed min-w-full divide-y border divide-gray-300">
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
                                agents.map((agent, index) => (
                                    <AccountItem key={index} agent={agent} setSelect={setSelect} setRemovemodal={setRemovemodal} setEditmodal={setEditmodal}/>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    {/* Add agent Modal */}
    {
        addmodal && <AddAgentModal setAddmodal={setAddmodal}/>
    }


    
    {/* Edit agent Modal */}
    {
        editmodal && <EditerAgentModal select={select} setEditmodal={setEditmodal}/>
    }
    
    
    {/* Remove agent Modal */}
    {
        removemodal && <RemoveAgentModal select={select} setRemovemodal={setRemovemodal} />
    }


</section>
  )
}

export default AgentAccounts;