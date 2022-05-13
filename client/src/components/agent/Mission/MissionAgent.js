import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import ItemMission from './ItemMission';
import FilterMission from './FilterMission';

const MissionAgent = () => {

    let [missions, setMissions] = useState([])
    let [query, setQuery] = useState("")

    // Hooks of trie
    let [trie, setTrie] = useState("")

    // fetch missions from backend
    let fetchMissions = async () => {
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

    }


    useEffect(() => {
        fetchMissions()
    }, [])


    // display mission
    let displayMissions = missions.map((item, index) => (
        <ItemMission key={index} item={item}/>
    ))
    
    // display mission search bar
    let searchBarMissions = missions.filter((item) => item.description.toLowerCase().includes(query)).map((item, index) => (
        <ItemMission key={index} item={item}/>
    ))


    // function trie : Recent and Ancien
    let renderMissions = (val) => {

        // Recent
        if(val === "Recent" )
        {
            let recent = missions.sort((a, b) => {
                let first = new Date(a.datemission)
                let second = new Date(b.datemission)
                return second - first
            })

            let datasort = recent.map((item, index) => (
                <ItemMission key={index} item={item} />
            ))
            
            return query ? (searchBarMissions) : (datasort)
        }
        
        // Ancien
        if (val === "Ancien")
        {
            let ancien = missions.sort((a, b) => {
                let first = new Date(a.datemission)
                let second = new Date(b.datemission)
                return first - second
            })

            let datasort = ancien.map((item, index) => (
                <ItemMission key={index} item={item} />
            ))

            return query ? (searchBarMissions) : (datasort)
        }

        return query ? (searchBarMissions) : (displayMissions)
    }







  return (
        <section className="mx-4 mb-4">
            <div className="px-4 pb-4 flex w-full bg-white sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                <div className="mb-1 w-full">
                    <div className="my-2 justify-between flex sm:flex-row flex-col">

                            {/*Search Bar Mission*/}
                            <SearchBar setQuery={setQuery} />

                            {/*<!-- Filter -->*/}
                            <FilterMission trie={trie} setTrie={setTrie}/>
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
                            </tr>
                        </thead>


                        <tbody className="bg-white divide-y divide-gray-200">


                            {/*<!-- Item -->*/}
                            {
                                renderMissions(trie)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</section>
  )
}

export default MissionAgent;