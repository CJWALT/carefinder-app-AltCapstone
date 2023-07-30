import React, { useEffect, useState } from 'react'
import {FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import './Home.css'

import {useDebounce} from '../../hooks/use-debounce';
import SearchBar from '../../components/searchbar/SearchBar';

type ResultType = {type: 'region' | 'hospital' ; data : any[]};

 function Home () { 

    const [locationQuery, setLocationQuery ] = useState(''); 
    const [nameQuery, setNameQuery] = useState('')
    const [isLoading, setLoading] = useState(false); 
    const [ results, setResults ] = useState<ResultType>(); 
    const [hospitals, setHospitals ] = useState ([])

    const debouncedLocationQuery = useDebounce (locationQuery, 1000); 
    const debouncedNameQuery = useDebounce(nameQuery, 1000);

    const handleSearch = async (term: string) =>
        new Promise((resolve, reject)=>{
        setLoading(true); 
    
        fetch(`https://carefinder-backend.vercel.app/api/search?term=${term}`)
            .then((res) => res.json())
            .then((data)=>{ 
                setLoading(false); 
                resolve(data);
            })
            .catch ((error) =>{
                setLoading(false);
                reject(error); 
            });
        });

        useEffect(() =>{ 
            if(debouncedLocationQuery.length < 3) return ; 

            handleSearch(debouncedLocationQuery).then((data) =>
                setResults({ type: 'region', data: (data as any).hospitals as any[]}),
                );
            }, [debouncedLocationQuery]); 


        useEffect (() => { 
            if (debouncedNameQuery.length < 3 ) return; 
            handleSearch(debouncedNameQuery).then((data) => 
            setResults ({type: 'hospital', data: (data as any).hospitals as any[] }),
            );
        }, [debouncedNameQuery] )


        return(
            <div className="home-wrap">
                <div className="content-wrap">
                    <h1 className="home-heading">
                        <span className="highlight">
                           Search list of hospitals </span> close to you
                    </h1>
                    <small className="home-para">
                        The easiest way to get list and address of hospitals near you.
                    </small>

                    <SearchBar/>

                    <div className="footer">
        <div className="footer-icons">
          <a target="_blank" href="https://www.github.com/cjwalt">
            <FaGithub />
          </a>
          <a target="_blank" href="https://www.twitter.com/im_walt2">
            <FaTwitter />
          </a>
        </div>

        <p className="footer-p">© 2023 All rights reserved</p>
      </div>
                </div>
            </div>
        )
    

}

export default Home
