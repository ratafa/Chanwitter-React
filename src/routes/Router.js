import React from 'react';
import {HashRouter, Routes, Route} from 'react-router-dom';
import Auth from '../routes/Auth';
import Navigation from "../components/Navigation";
import Home from "./Home";
import Profile from "./Profile";

const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <>
            {isLoggedIn && <Navigation/>}
            {isLoggedIn ?
                <Routes>
                    <Route path='/' element={<Home userObj={userObj}/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                </Routes>
                : <Auth/>
            }
        </>
    )
}

export default AppRouter;
