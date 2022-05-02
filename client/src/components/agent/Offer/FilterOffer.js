import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FilterOffer = ({trie, setTrie}) => {

    let [val, setVal] = useState(["Trier par","Recent", "Ancien"])
    let Add = val.map(Add => Add)

    let handleSelect = (e) => {
        setTrie(trie = val[e.target.value])
    }



  return (
    <div className="flex items-center text-gray-700 px-3 py-1 border font-medium rounded">

    <FontAwesomeIcon className="w-5 h-full" icon={faFilter} />

    <select className="form-select hover:bg-teal-100 bg-transparent appearance-none block text-gray-700 text-center transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none" onChange={e => handleSelect(e)}>
        {
          Add.map((elem, key) => <option value={key}>{elem}</option>)
        }
    </select>
</div>
  )
}

export default FilterOffer;