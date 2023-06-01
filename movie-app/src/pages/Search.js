import React, {useState, useRef, useEffect, useContext} from 'react'

import {FetchTMDBContext} from "../contexts/FetchTMDBContext";
import "../style/Search.css"
import {SearchBarContext} from "../contexts/SearchBarContext";
import SearchBarComponent from "../components/SearchBar";
import DiscoverButton from "../components/DiscoverButton";

import axios, {post} from "axios";
import {CartInfoContext} from "../contexts/CartInfoContext";


const imagePath = 'https://image.tmdb.org/t/p/original'
const Search = () => {

    const {SearchBarComponent} = useContext(SearchBarContext);
    const cartInfo = useContext(CartInfoContext);
    const {search,discover} = useContext(FetchTMDBContext);
    const [searchInput, setSearchInput] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [discovering,setDiscovering] = useState(false);
    const [genreToSearchBy,setGenreToSearchBy] = useState(0);
    const [yearToSearchBy,setYearToSearchBy] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);


    const OnPageChange = async (page) => {
        setCurrentPage(page);
        handleSearchRequest();
    }


    const handleAddToCartClick = async(result)=>{
            try{
            const response = await axios.post('/api/addToCart',null, {
                params: {
                    movieId: result.id,
                    image:  result.poster_path,
                    desc: result.overview,
                    name: result.original_title,
                    release: result.release_date,
                    price: "3.99"
                },
            });

            cartInfo.handleAddToCart();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleSearchRequest = async (e) => {
        e.preventDefault();
        if (searchInput.trim() !== '') {
            const searchResponse = await search(searchInput,currentPage);
            setSearchResult(searchResponse.results);
            setTotalPages(searchResponse.total_pages);
        }
    };
    const handleDiscoverRequest = async (e) => {

        if(discovering) {
            const discoverResponse = await discover(genreToSearchBy, yearToSearchBy, currentPage);
            setSearchResult(discoverResponse.results);
            setTotalPages(discoverResponse.total_pages);
        }
    };

    useEffect(() => {
        handleDiscoverRequest();
    },[yearToSearchBy,genreToSearchBy]);
    function getSearchResult(){

        return(
            <div className='container'>
                <div className='row row-cols-1 row-cols-md-2 g-4 justify-content-center'>
                    {searchResult.map(result => (
                        <div className='card col' key={result.id}>
                            <img src={imagePath + result.poster_path} className="card-img-top" alt="img"/>
                            <div className="card-body" >
                                <h5 className="card-title">{result.original_title}</h5>
                                <p className="card-text">{result.overview}</p>
                                <p className="card-text">released: {result.release_date}</p>
                                <p className="card-text">price: 3.99</p>
                            </div>
                            <button type="button" className='btn btn-outline-secondary'
                                    onClick={()=>handleAddToCartClick(result)}>
                                Add to cart!</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
    <>

        <form onSubmit={!discovering?handleSearchRequest:handleDiscoverRequest} style = {{ position : 'relative', height : '100%'}} >
            <div className="row" >
                <div className = {discovering? 'col-12' : 'col-2'}>
                <DiscoverButton discovering={discovering} setDiscovering={setDiscovering}
                                setGenreToSearchBy={setGenreToSearchBy} setYearToSearchBy = {setYearToSearchBy}/>
                </div>
                {discovering? null:
                    <div className = {!discovering&& 'col-10'}>
                        <SearchBarComponent className = 'col-4' searchInput={searchInput} setSearchInput = {setSearchInput}/>
                    </div>}
            </div>

            <div className="row" style = {{margin : '50px'}}>
            {getSearchResult()}
            </div>
        </form>
    </>
    );
};

export default Search;