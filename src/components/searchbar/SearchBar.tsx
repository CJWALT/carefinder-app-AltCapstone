import React, {useEffect, useState} from 'react';
import './SearchBar.css';
import Select from 'react-select';
import {useNavigate} from 'react-router-dom';

type SearchProps = { value: string; label: string}; 

function SearchBar() { 


    const navigate = useNavigate();

    const [allHospitals, setAllHospitals] = useState <any[]>([]);
    const [hospitals, setHospitals] = useState <SearchProps[]> ([]); 
    const [regions, setRegions] = useState <SearchProps[]>([]); 


    useEffect(() =>{
        fetch (`https://carefinder-backend.vercel.app/api/hospitals`)
            .then((res) => res.json()) 
            .then((data) =>{ 
                console.log(data);
                const _hospitals = data.map((datum: any) => ({value: datum.id,
                    label: datum.name }));
                    setHospitals(_hospitals);
                    setAllHospitals(data);
            })
            .catch((error) =>{ 
                console.error(error)
            });

            fetch (`https://carefinder-backend.vercel.app/api/regions`)
                .then((res) => res.json())
                .then((data) =>{ 
                    const _regions = data.map((datum: any) => ({value: datum.id, 
                    label: datum.name }))
                    setRegions(_regions);
                })
                .catch((error)=>{ 
                    console.error(error)
                });
            }, []);


            const handleHospitalSelect = ({value} :any) =>{ 
                navigate(`/find?id=${value}`);
            }

            const handleLocationSelect = ({value } :any) =>{ 
                navigate(`/find?region=${value}`);
            };


            return(
                <div className="search-wrap">
                    <div className="input-wrap">
                        <Select 
                        placeholder = "input hospital name"
                        className = "search-input input-name"
                        options={hospitals}
                        onChange={handleHospitalSelect}   
                        />

                        <div className="divide-input">
                        <Select 
                            placeholder ="input hospital location"
                            className = "search-input input-loc"
                            options={regions}
                            isClearable 
                            onChange={handleLocationSelect}
                            />
                        </div>
                        
                    </div>
                </div>
            )

    }

export default SearchBar;
