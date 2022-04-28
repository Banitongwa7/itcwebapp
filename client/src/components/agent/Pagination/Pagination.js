import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Pagination extends Component {
  render() {
    return (
        <section className="bottom-0 w-full mb-20">
        <div className="items-center flex-col px-5 py-5 flex justify-center">
            <span className="text-xs xs:text-sm text-gray-900 mb-5">
                Resultat 1 - 50420 offres d'opportunités
            </span>
            <nav aria-label="Page navigation">
                <ul className="flex list-style-none">
                    <Link to='' className="page-item page-link relative block py-1.5 px-3 text-sm bg-gray-300 outline-none rounded text-gray-800 hover:text-gray-800 hover:bg-gray-400 focus:shadow-none">Précédent</Link>
                    <Link to='' className="page-item page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none rounded-full text-gray-800 focus:shadow-none">1</Link>
                    <Link to='' className="page-item page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none rounded-full text-gray-800 focus:shadow-none">2</Link>
                    <Link to='' className="page-item page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none rounded-full text-gray-800 focus:shadow-none">3</Link>
                    <Link to='' className="activepag page-item page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none rounded-full text-gray-800 focus:shadow-none">4</Link>
                    <Link to='' className="page-item page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none rounded-full text-gray-800 focus:shadow-none">5</Link>
                    <Link to='' className="page-item page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none rounded-full text-gray-800 focus:shadow-none">6</Link>
                    <Link to='' className="page-item page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none rounded-full text-gray-800 focus:shadow-none">7</Link>
                    <Link to='' className="page-item page-link relative block py-1.5 px-3 text-sm bg-gray-300 outline-none rounded text-gray-800 hover:text-gray-800 hover:bg-gray-400 focus:shadow-none">Suivant</Link>
                </ul>
            </nav>
        </div>
    </section>
    )
  }
}

export default Pagination;