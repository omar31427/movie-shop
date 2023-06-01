
import {FetchTMDBContext} from "../contexts/FetchTMDBContext";
import React, {useContext, useState,useEffect} from 'react'
import {Button} from "react-bootstrap";

function DiscoverButton({discovering, setDiscovering,setGenreToSearchBy,
                        setYearToSearchBy}){
    const [genres,setGenres] = useState([]);
    const {getGenres} = useContext(FetchTMDBContext);
    const [searchByGenre,setSearchByGenre] = useState(false);
    const [searchByYear,setSearchByYear] = useState(false);
    const [curYear,setCurYear] = useState(1900);
    const yearOptions = [];

    for (let i = 1900; i <= 2030; i++) {
        yearOptions.push({ value: i, label: i });
    }
    const updateGenres = async()=> {
        try {
            const response = await getGenres();
            setGenres(response);
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };


    useEffect(() => {
        updateGenres();
        },[]);


    const handleDiscoverChange = ()=>{
        setDiscovering(!discovering);
        if(!discovering) {
            setSearchByGenre(false);
            setSearchByYear(false);
        }
    }
    function handleGenreClick(genreId){
        setGenreToSearchBy(genreId);
    }

    const changeYear  = (event)=>{
        setYearToSearchBy(()=> event.target.value);
    }

    return (
        <>
            <Button type="button" className="btn btn-primary" onClick={handleDiscoverChange}
                    style = {{width: '100%', marginTop: '35px', padding : '10px'
                        , borderRadius : '10px',marginBottom:'10px'}}>
                Discover
            </Button>
            {discovering&&
                <div >
                    <Button type="button" className="btn btn-secondary btn-lg col-6"
                            onClick={()=>{setSearchByGenre(!searchByGenre) ; setSearchByYear(false)}} >
                        Search By genre
                    </Button>
                    <Button type="button" className="btn btn-secondary btn-lg col-6"
                            onClick={()=>{setSearchByYear(!searchByYear); setSearchByGenre(false)}} >
                        Search By year
                    </Button>
                    {searchByGenre&&genres.map((genreOptions) => (
                        <Button type="button" className="btn btn-secondary btn-sm inactive" style = {{margin : '5px'}}
                        onClick={()=>handleGenreClick(genreOptions.id)} key = {genreOptions.id}
                                data-bs-toggle="button" aria-pressed="true">
                            {genreOptions.name}
                        </Button>
                    ))}
                    {searchByYear&&
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <select id = {"1"} className = 'col-3' value = {"select"} onChange={changeYear}>
                            {yearOptions.map((year)=>(
                                <option id = {year.value} value = {year.value} >
                                    {year.label}</option>
                            ))}
                        </select>
                        </div>}

                </div>
            }
        </>
    );
}
export default DiscoverButton;