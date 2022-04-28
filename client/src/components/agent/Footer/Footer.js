import React, { Component } from 'react'




class Footer extends Component {

  render() {
    return (
      <footer className="bg-gray-200 text-center h-10 w-full">
        <div className="px-6 pt-6 bg-gray-200">
            <form action="#" method="post">
                <div className="grid md:grid-cols-3 gird-cols-1 gap-4 justify-center items-center">

                    {/*  Text subscribe */}
                    <div className="md:ml-auto md:mb-6">
                        <p className="text-gray-800">
                            <strong>S'inscrire au newsletter</strong>
                        </p>
                    </div>

                    {/* Input bar */}

                    <div className="md:mb-6">
                        <input type="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="newsletter" placeholder="Votre adresse email..." />
                    </div>

                    {/* Button submit */}

                    <div className="md:mr-auto mb-6">
                        <button type="submit"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:shadow-lg shadow-lg">Envoyer</button>
                    </div>
                </div>
            </form>
        </div>

        <div className="text-center font-mono text-white p-4 bg-gray-900">
            {(new Date().getFullYear())} - ITC Consulting
        </div>
    </footer>
    )
  }
}

export default Footer;