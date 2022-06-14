import React from 'react'

const SearchBarOffer = ({setQuery}) => {


  return (
    <div className="block relative">
            <button type="submit" className="h-full absolute inset-y-0 left-0.5 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500 hover:text-gray-900">
                    <path
                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                    </path>
                </svg>
            </button>
            <input type="search" placeholder="Recherche" name="recherche" className="appearance-none rounded-full sm:rounded-full border-gray-400 border block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" onChange={(e)=>setQuery(e.target.value)}/>
    </div>
  )
}

export default SearchBarOffer;