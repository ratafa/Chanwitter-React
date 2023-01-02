import React from "react";
import {auth} from "../myBase";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const handleLogOut = async () => {
        await auth.signOut();
        navigate('/');
    }
    return (
        <>
            <button onClick={handleLogOut}>Log out</button>
        </>
    )
}

export default Profile;
