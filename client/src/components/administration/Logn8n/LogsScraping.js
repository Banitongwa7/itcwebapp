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
    <ol className="relative ml-10 border-l border-slate-400 mt-10">

    {
      logs.slice(-100).reverse().map((item, index) => (

        <ItemLog key={index} item={item}/>

      ))
    }
  </ol>
  )
}

export default LogsScraping;