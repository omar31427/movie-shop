import NavBar from "./NavBar";

import React from 'react'
function SearchBarComponent({searchInput,setSearchInput}){
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);

    };
    return (<input
            style = {{width: '100%', margin: '30px', padding : '10px',
                fontSize:  '25px', borderRadius : '30px'}}
            type="search"
            placeholder="Search for movies"
            value={searchInput}
            onChange={handleChange}
            />);
}
export default SearchBarComponent;