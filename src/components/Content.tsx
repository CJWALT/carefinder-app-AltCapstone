
import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom'
import Find from '../pages/find/Find';
import Home from '../pages/home/Home'
import Login from '../pages/login/Login';
import Layouts from '../pages/shared_Layout/Layouts';
import Sign from '../pages/sign/Sign'


const Content: React.FC = () =>{

    return(
         <HashRouter>
            <Routes> 
                <Route path ="/" element ={<Layouts />}>
                    <Route index element = {<Home />}/> 
                    <Route path ="/find" element={<Find />}/>
                    <Route path ="/login" element={<Login />}/>
                    <Route path ="/sign" element={<Sign />}/>
                </Route>
            </Routes>
         </HashRouter> 
    )
    }

export default Content