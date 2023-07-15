import React, {useEffect, useMemo, useState} from 'react'
import {getAuth } from 'firebase/auth'
import './NavBar.css';
import {BsFillHeartPulseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'; 
import {useNavigate} from 'react-router-dom'

type NavbarLink = { 
    id:number; 
    name:string; 
    path:string; 
}


function NavBar() {
    const navigate = useNavigate(); 
    const [isLoggedIn, setLoggedIn] = useState(false);

    const signOut = async () =>{
        await getAuth().signOut(); 
        navigate('/');
    }; 

    useEffect(()=>{ 
        getAuth().onAuthStateChanged((user: any)=>{ 
            setLoggedIn(!!user);
        });
    }, []);

    const links: NavbarLink[] = useMemo <NavbarLink[]> (() => { 
        const _links = [
            { id: 1, name: 'home', path:'/'},
            {id:2, name:'about', path:'/about'}, 
            {id:3, name: 'Find Hospital', path: '/find'},
        ];
        if(!isLoggedIn){
            _links.push({id:4, name: 'login', path:'/login'});
            _links.push({id:5, name:'sign up', path: '/sign'}); 
        } else{ 
            _links.push({id:6, name:'admin', path:'/admin'});

        }
        return _links;
    }, [isLoggedIn])
     return (
        <nav>
            <div className="logo-wrap">
                <div className="logo">
                    <p>LOGO</p>
                </div>
            </div>
            <div className="links">
                {links.map((link) =>(
                    <Link key={link.id} to={link.path}>{link.name}</Link>
                ))}
                {isLoggedIn && (
                    <button className ="out-btn" onClick={signOut}>
                        Sign out
                    </button>
                )}
            </div>
        </nav>
  )
}

export default NavBar