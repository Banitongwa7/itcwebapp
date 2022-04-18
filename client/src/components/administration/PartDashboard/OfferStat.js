import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

const OfferStat = () => {


  return (
    <section>
    <div>
        <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8">
            <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Statistique des offres par site</h3>

            {/*<!-- Button Add website -->*/}
            <div className="flex w-full justify-end my-5">
                <button type="button" data-modal-toggle="add-website-modal"
                    className="w-1/2 text-white bg-blue-900 hover:bg-blue-700 outline-none font-medium flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                    <FontAwesomeIcon icon={faPlus} className='mr-1 h-5 w-6 text-lg'/>
                    <span>Ajouter un site</span>
                </button>
            </div>

            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border border-gray-400">

                    <thead className="border border-gray-400">
                        <tr>
                            <th
                                className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                Site web</th>
                            <th
                                className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-400">


                        <tr className="text-gray-900">
                            <th
                                className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                <Link to="//www.tuneps.tn/index.do" target="_blank" className="text-blue-800 underline">Tunisia on-line E-Procurement System</Link></th>
                            <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2 text-xs font-medium">2152</span>
                                    <div className="relative w-full">
                                        <div className="w-full bg-gray-200 rounded-sm h-2">
                                            <div className="bg-indigo-700 h-2 rounded-sm w-[50%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>



                        <tr className="text-gray-900">
                            <th
                                className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                <Link to="//www.google.com" className="text-blue-800 underline" target="_blank" >Referral</Link></th>
                            <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                    <span className="mr-2 text-xs font-medium">300</span>
                                    <div className="relative w-full">
                                        <div className="w-full bg-gray-200 rounded-sm h-2">
                                            <div className="bg-indigo-700 h-2 rounded-sm w-[24%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>
        </div>
    </div>
    {/*
    <!-- Add website Modal -->*/}
    <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full"
        id="add-website-modal">
        <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
            {/*<!-- Modal content -->*/}
            <div className="bg-white rounded-lg shadow relative">
                {/*<!-- Modal header -->*/}
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold">
                        Ajouter un site de scraping
                    </h3>
                    <button type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-toggle="add-website-modal">
                        <span className='w-5 h-5 text-gray-900 text-lg'><FontAwesomeIcon icon={faXmark} /></span>
                    </button>
                </div>
                {/*
                <!-- Modal body -->*/}
                <div className="p-6 space-y-6">
                    <form action="#" method='post'>
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="titlewebsite" className="text-sm font-medium text-gray-900 block mb-2">Titre du site web</label>
                                <input type="text" name="titlewebsite" id="titlewebsite" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5" required />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="linkurl" className="text-sm font-medium text-gray-900 block mb-2">Url du site</label>
                                <input type="url" name="linkurl" id="linkurl"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"
                                    required />
                            </div>
                        </div>

                        {/*
                        <!-- Modal footer -->*/}
                        <div className="items-center p-6 border-t border-gray-200 rounded-b">
                            <button
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="submit">Valider</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default OfferStat;