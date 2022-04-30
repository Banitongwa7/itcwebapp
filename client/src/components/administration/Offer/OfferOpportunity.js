import React, { useState, useEffect, Fragment } from 'react';
import SearchBarOffer from './SearchBarOffer';
import FilterOffer from './FilterOffer';
import ItemOffer from './ItemOffer';
import ReactPaginate from 'react-paginate';

const OfferOpportunity = () => {
    let [data, setData] = useState([])
    let [pageNumber, setPageNumber] = useState(0)
    let [query, setQuery] = useState("")

    // Hooks of trie
    let [trie, setTrie] = useState("")


    let fetchDatascraper = async () => {
        let resp = await fetch("http://127.0.0.1:8000/api/datascraper/", {
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
        fetchDatascraper()
    }, [])

    // number of item per page
    const itemsPerPage = 10

    let pagesVisited = pageNumber * itemsPerPage

    let displayItems = data.slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index) => (
        <ItemOffer key={index} item={item} />
    ))

    let searchBar = data.filter((item) => item.content.toLowerCase().includes(query)).map((item, index) => (
        <ItemOffer key={index} item={item} />
    ))

        // count current page
    let pageCount = Math.ceil(data.length / itemsPerPage)

    let changePage = ({selected}) => {
        setPageNumber(selected)
    }

    // function trie : Recent and Ancien
    let renderElement = (val) => {

        // Recent
        if(val === "Recent" )
        {
            let recent = data.sort((a, b) => {
                let first = new Date(a.datescraping)
                let second = new Date(b.datescraping)
                return second - first
            })

            let datasort = recent.slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index) => (
                <ItemOffer key={index} item={item} />
            ))

            let trieRecent = query ? (searchBar) : (datasort)
            return trieRecent
        }
        
        // Ancien
        if (val === "Ancien")
        {
            let ancien = data.sort((a, b) => {
                let first = new Date(a.datescraping)
                let second = new Date(b.datescraping)
                return first - second
            })
            let datasort = ancien.slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index) => (
                <ItemOffer key={index} item={item} />
            ))

            let trieAncien = query ? (searchBar) : (datasort)
            return trieAncien
        }

        let normal = query ? (searchBar) : (displayItems)
        return normal
    }

  return (
      <Fragment>
        <section className="antialiased font-sans my-5">
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">

                    {/*<!-- Filter and search -->*/}
                    <div className="my-2 justify-between flex sm:flex-row flex-col">

                        {/*<!-- Search bar -->*/}
                        <SearchBarOffer setQuery={setQuery}/>


                        {/*<!-- Filter -->*/}
                        <FilterOffer trie={trie} setTrie={setTrie}/>


                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full overflow-hidden">
                            <div className="min-w-full">
                                <div>


                                    {/*<!-- Item -->*/}
                                    {
                                        renderElement(trie)
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {
            query ? (<section></section>) : (
                <section className="bottom-0 w-full">
                    <div className="items-center flex-col px-5 py-5 flex justify-center">
                        <span className="text-xs xs:text-sm text-gray-900 mb-5">
                            Resultat 1 - {data.length} offres d'opportunités
                        </span>
                        <ReactPaginate 
                            previousLabel={"« Précédent"}
                            nextLabel={"Suivant »"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"flex list-style-none"}
                            pageClassName={"page-item page-link block py-1.5 px-3 mx-1 border-0 outline-none rounded-full focus:shadow-none"}
                            previousLinkClassName={"page-item page-link block py-1.5 px-3 text-sm bg-gray-300 outline-none rounded text-gray-800 hover:text-gray-800 hover:bg-gray-400 focus:shadow-none"}
                            nextLinkClassName={"page-item page-link block py-1.5 px-3 text-sm bg-gray-300 outline-none rounded text-gray-800 hover:text-gray-800 hover:bg-gray-400 focus:shadow-none"}
                            disabledClassName={"disabled"}
                            activeClassName={"bg-blue-600 hover:bg-blue-700 rounded-full text-white shadow-lg"}
                        />
                    </div>
                </section>
            )
        }
        
      </Fragment>
  )
}

export default OfferOpportunity;