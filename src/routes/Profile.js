import React, {useEffect} from "react";
import {auth, dbService} from "../myBase";
import {collection, getDocs, query, where, orderBy} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import useInput from "../Hooks/useInput";

const Profile = ({userObj}) => {
    const [newDisplayName, handleDisplayName, setDisplayName] = useInput(userObj.displayName);
    const navigate = useNavigate();
    const handleLogOut = async () => {
        await auth.signOut();
        navigate('/');
    };
    const getMyNweet = async () => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createAt")
        );
        const querySnapShot = await getDocs(q);
        console.log(querySnapShot.docs.map(v => v.data()));
    }
    useEffect(() => {
        getMyNweet();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
        }
        setDisplayName('');
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Display your name" value={newDisplayName} onChange={handleDisplayName}/>
                <input type="submit" value="update profile"/>
            </form>
            <button onClick={handleLogOut}>Log out</button>
        </>
    )
}

export default Profile;
