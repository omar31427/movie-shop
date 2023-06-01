import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';
const API_KEY = '8f73bd0dd8ad19d8e093b814f5ee93a0';
export const FetchTMDBContext = createContext();

export const FetchTMDBContextProvider = ({children}) => {

    const discover = async (genre,releaseYear,pageNum) => {
        let query = 'https://api.themoviedb.org/3/discover/movie?include_adult=false';
        if(genre !== 0)
            query += '&with_genres='+genre;
        if(releaseYear!==0)
            query += '&year='+releaseYear;

        console.log(query);
        try {

                const res = await axios.get(query, {
                    params: {
                        api_key: API_KEY,
                        page: pageNum,
                    },
                });
            return res.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getGenres = async() => {
        try {
            const res = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key: API_KEY,
                    //query: query,
                },
            });
            return res.data.genres;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const search = async (query,page) => {
        try {
            const res = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: API_KEY,
                query: query,
                page: page
            },
        });
            console.log(res.data.results)

            return res.data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <FetchTMDBContext.Provider value={{ search,discover,getGenres}}>
            {children}
        </FetchTMDBContext.Provider>
    );
}
