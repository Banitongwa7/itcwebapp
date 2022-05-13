import React, { Component } from 'react';

class Error404 extends Component {





  
  render() {
    return (
      <div className="h-[100vh] w-full flex flex-col justify-center items-center bg-gray-900">
          <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
          <div className="bg-yellow-400 px-2 text-gray-900 text-sm rounded absolute">
             Page Not Found
          </div>
      </div>
    )
  }
}

export default Error404;