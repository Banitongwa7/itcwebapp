import React, { useState, useEffect } from 'react';
import SearchBarOpportunity from './SearchBarOpportunity';
import ItemOpportunity from './ItemOpportunity';
import RemoveQualificationModal from './../Modal/RemoveQualificationModal';
import EditerQualificationModal from './../Modal/EditerQualificationModal';


const Opportunity = () => {
    let [data, setData] = useState([])
    // Select Mission
    let [select, setSelect] = useState(null)

    // display or hidden modal
    let [editmodal, setEditmodal] = useState(false)
    let [removemodal, setRemovemodal] = useState(false)

    // fetch when we add something
    let [newItem, setNewItem] = useState(false)


    // query for search Bar
    let [query, setQuery] = useState("")

    let fetchOpportunity = async () => {
        let resp = await fetch("http://127.0.0.1:8000/api/qualification/", {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            })

        let data = await resp.json()

        if (resp.status === 200)
        {
            setData(data)
        }

    }


    useEffect(() => {
        fetchOpportunity()
    }, [])

    useEffect(() => {
        fetchOpportunity()
    }, [newItem])



    let displayOpportunity = data.map((item, index) => (
        <ItemOpportunity key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
    ))

    let searchBarOpportunity = data.filter((item) => item.proposition.toLowerCase().includes(query)).map((item, index) => (
        <ItemOpportunity key={index} item={item} select={select} setSelect={setSelect} setEditmodal={setEditmodal} setRemovemodal={setRemovemodal}/>
    ))


  return (
    <section className="antialiased font-sans my-5">
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">

                {/*<!-- Filter and search -->*/}
                <div className="my-2 justify-between flex sm:flex-row flex-col">

                    {/*<!-- Search bar -->*/}
                    <SearchBarOpportunity setQuery={setQuery}/>


                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full overflow-hidden">
                        <div className="min-w-full">
                            <div>


                                {/*<!-- Item -->*/}
                                {
                                    query ? (searchBarOpportunity) : (displayOpportunity)
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {/* Edit qualification Modal */}
        {
            editmodal && <EditerQualificationModal select={select} setEditmodal={setEditmodal} setNewItem={setNewItem} newItem={newItem}/>
        }

        
        {/* Remove qualification Modal */}
        {
            removemodal && <RemoveQualificationModal select={select} setRemovemodal={setRemovemodal} data={data} setData={setData} setNewItem={setNewItem} newItem={newItem}/>
        }
    </section>
  )
}

export default Opportunity;