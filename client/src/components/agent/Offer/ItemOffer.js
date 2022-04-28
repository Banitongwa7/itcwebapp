import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import photoTest from '../../../assets/photoTest.jpg';

class ItemOffer extends Component {
  render() {
    return (
        <div className="border-gray-250 border mb-5 shadow-lg">
        <div className="flex sm:flex-row flex-col justify-between px-5 py-5 bg-white">
            <div className="flex items-center w-full h-full">
                <div className="w-96 h-20 hidden md:block">
                    <img className="rounded-l object-cover" src={photoTest} alt="test" />
                </div>
                <div className="px-4 flex flex-wrap">
                    <span className="text-sm font-semibold text-gray-900 mb-1">Gloria Roberston</span>

                    <span className="text-sm font-semibold text-gray-600">Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Error nulla accusamus incidunt
                        iure quod! Ipsum facilis quibusdam vel ut, quae, exercitationem
                        corporis labore ipsa voluptatibus sed recusandae, beatae amet!
                        Perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, voluptatibus. Autem assumenda aliquam veniam blanditiis, nulla unde necessitatibus dolores, quas deleniti repellendus excepturi, officiis consequuntur quaerat quos dolor repudiandae soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod necessitatibus repellendus non, consequatur ipsa autem unde vero soluta modi saepe? In autem impedit reprehenderit, nisi quaerat odit corrupti mollitia blanditiis.</span>
                </div>
            </div>
            <div className="md:w-40 mr-4 sm:mt-5 h-20 text-right md:flex md:flex-wrap justify-end justify-items-end">
                <span className="text-sm font-normal text-gray-600">2 days ago</span>
                <div className="mt-7">
                    <Link to="#" className="text-blue-700 text-sm  inline-flex items-center font-semibold tracking-wide">
                        <span className="hover:underline">
                            Consulter le lien
                        </span>
                        <span className="text-xl ml-2">&#8594;</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default ItemOffer;