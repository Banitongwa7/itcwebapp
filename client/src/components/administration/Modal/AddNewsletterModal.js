import React from 'react'

const AddNewsletterModal = () => {
  return (
    <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" id="add-newsletter-modal">
        <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
            {/*
            <!-- Modal content -->*/}
            <div className="bg-white rounded-lg shadow relative">
                {/*
                <!-- Modal header -->*/}
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold">
                        Ajouter un utilisateur à la newsletter
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-toggle="add-newsletter-modal">
                        <i className="fa-solid fa-xmark w-5 h-5 text-gray-900 text-lg"></i>
                    </button>
                </div>
                {/*
                <!-- Modal body -->*/}
                <div className="p-6 space-y-6">
                    <form action="#" method="post">
                        <div className="grid">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="emailnews"
                                    className="text-sm font-medium text-gray-900 block mb-2">E-mail de
                                    l'utilisateur</label>
                                <input type="email" name="emailnews" id="emailnews"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"
                                    required />
                            </div>
                        </div>
                        {/*<!-- Modal footer -->*/}
                        <div className="items-center p-6 border-t border-gray-200 rounded-b">
                            <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="submit">
                                Valider
                            </button>
                        </div>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default AddNewsletterModal;
