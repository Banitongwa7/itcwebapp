import React, { Component } from 'react'

export class SearchOffer extends Component {
  render() {
    return (
        <div className="my-2 justify-between flex sm:flex-row flex-col">

        {/* Search bar */}
        <div className="block relative">
            <form action="#" method="post">
                <button type="submit" className="h-full absolute inset-y-0 left-0.5 flex items-center pl-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500 hover:text-gray-900">
                        <path
                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                        </path>
                    </svg>
                </button>
                <input type="search" placeholder="Recherche" name="recherche"
                    className="appearance-none rounded-full sm:rounded-full border border-gray-400 block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
            </form>
        </div>


        {/* Filter */}
        <div className="flex items-center text-gray-700 px-3 py-1 border font-medium rounded">
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" className="w-5 h-full">
                <g>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                        d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z">
                    </path>
                </g>
            </svg>
            <select className="form-select hover:bg-teal-100 bg-transparent appearance-none block text-gray-700 text-center transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none"
                aria-label="Default select example">
                <option selected>Filtrer par...</option>
                <option value="1">Recent</option>
                <option value="2">Ancien</option>
            </select>
        </div>


    </div>
    )
  }
}

export default SearchOffer