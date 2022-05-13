import React, { useEffect, useState } from 'react';
import ItemLog from './ItemLog';


function LogsScraping() {
  let [logs, setLogs] = useState([])

  // fecth logs n8n
  let fetchLogs = async () => {
    let resp = await fetch("http://127.0.0.1:8000/api/logscraper/", {
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })

    let data = await resp.json()

    if (resp.status === 200)
    {
      setLogs(data)
    }

}

useEffect(() => {
  fetchLogs()
}, [])

  return (
    <ol class="relative border-l border-gray-200 mt-10">

    {
      logs.map((item, index) => (
        
        <ItemLog key={index} item={item}/>
      ))
    }
  </ol>
  )
}

export default LogsScraping;