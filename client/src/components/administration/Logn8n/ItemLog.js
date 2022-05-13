import React from 'react';
import n8n from './../../../assets/n8n.png';

const ItemLog = ({item}) => {




  return (
    <li class="ml-10 mr-10">
          <div class="justify-between items-center p-4 rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-gray-700">
              <div class="text-md font-extrabold"><span class=" text-white text-sm font-mono mr-2 px-2.5 py-0.5 rounded">{item.line}</span></div>
          </div>
    </li>
  )
}

export default ItemLog;