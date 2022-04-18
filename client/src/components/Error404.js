import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Error404 extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="h-[100vh] w-full flex flex-col justify-center items-center bg-gray-900">
          <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
          <div className="bg-yellow-400 px-2 text-gray-900 text-sm rounded absolute">
             Page Not Found
          </div>
        {/*  <button className="mt-5">
            <Link to="/agent/home" className="relative block bg-blue-600 px-8 py-3 border border-white text-sm font-medium text-white rounded-md hover:bg-blue-900">
                Aller vers la page home
            </Link>
          </button> */}
      </div>
    )
  }
}

export default Error404;