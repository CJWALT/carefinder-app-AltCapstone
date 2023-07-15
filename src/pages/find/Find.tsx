import React, {useEffect, useState } from 'react'
import {useLocation, useSearchParams } from 'react-router-dom'
import SearchBar from '../../components/searchbar/SearchBar'
import './Find.css'
import HospitalRow from './HospitalRow'; 

const Find: React.FC = () =>{ 
  const [search, setSearch] = useSearchParams(); 

  const [isLoading, setLoading] = useState(false); 
  const [hospital, setHospital] = useState <any>(); 
  const [regions, setRegions] = useState <any[]>([]); 
  const [type, setType] = useState<'hospital' | 'region'>(); 

  useEffect(()=>{ 
    const id = search.get('id'); 
    const region = search.get('region'); 

    if(id){ 
      fetch (`https://carefinder-backend.vercel.app/api/hospitals/${id}`)
        .then((res) => res.json())
        .then((res) =>{ 
          setLoading(false); 
          setType('hospital'); 
          setHospital(res);
        })
        .catch((error)=>{
          setType('hospital');
          setLoading(false); 
          console.error(error);
        });
    }
    if(region){ 
      fetch(`https://carefinder-backend.vercel.app/api/hospitals?region=${region}`)
      .then((res) => res.json())
      .then((res)=>{ 
        setLoading(false); 
        setType('region'); 
        setRegions(res); 
      })
      .catch((error) =>{ 
        setType('region'); 
        setLoading(false); 
        console.log(error);
      });
    }
  }, [search])

  const id = search.get('id'); 
  const region = search.get('region');

  return(
    <div className="get_content">
      <SearchBar/>
      {type === 'region' && (
        <h2 className="get_title">
          List of hospitals in your region {' '}
          <a href={`https://carefinder-backend.vercel.app/api/hospitals?region=${region}&output=csv`} className="dwnld">Download hospital lists.</a>
        </h2>
      )}
      {type === 'hospital' && (
        <h2 className="get_title">
          Hospital details: {' '}
          <a href={`https://carefinder-backend.vercel.app/api/hospitals?region=${region}&output=csv`} className="dwnld">Download</a>
        </h2>
      )}

      {type === 'region' && regions.length === 0 && <div>
        No hospitals found in your region 
        </div>  }

      {type === 'hospital' && !hospital?.id && <div>
        No hospital with this id. 
                </div>  }

        <div className="hosp-wrap">
          {type === 'region' && 
            regions.length > 0 && 
            regions.map((regions)=> <HospitalRow hospital = {hospital}/> )}

            {type === 'hospital' && hospital?.id && <HospitalRow hospital= {hospital}/>  }
        </div>
    </div>
  )

}
export default Find