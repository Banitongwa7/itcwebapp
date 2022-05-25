import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import ItemMission from './ItemMission';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownLong, faArrowUpLong } from '@fortawesome/free-solid-svg-icons';

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


    // function trie : maj and ajout
    let renderMissions = (val) => {

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
                    <ItemMission key={index} item={item}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarMissions) : (dataTrie)
            }else{
                let majTrie = missions.sort((a, b) => {
                    let first = new Date(a.lastupdate)
                    let second = new Date(b.lastupdate)
                    return second - first
                })

                let dataTrie = majTrie.map((item, index) => (
                    <ItemMission key={index} item={item}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarMissions) : (dataTrie)
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
                    <ItemMission key={index} item={item}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarMissions) : (dataTrie)
            }else{
                let ajoutTrie = missions.sort((a, b) => {
                    let first = new Date(a.datemission)
                    let second = new Date(b.datemission)
                    return second - first
                })

                let dataTrie = ajoutTrie.map((item, index) => (
                    <ItemMission key={index} item={item}/>
                ))
                setTrie(trie = "")
                return query ? (searchBarMissions) : (dataTrie)
            }
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