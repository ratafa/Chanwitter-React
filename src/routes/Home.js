import React, {useEffect, useState} from "react";
import useInput from "../Hooks/useInput";
import {dbService} from "../myBase";
import {addDoc, collection, getDocs, query, onSnapshot, orderBy} from "firebase/firestore";
import Nweet from "../components/Nweet";

const Home = ({userObj}) => {
    const [nweet, handleNweet, setNweet] = useInput('');
    const [nweets, setNweets] = useState([]);
    // const getNweets = async () => {
    //     const dbNweets = await getDocs(collection(dbService, "nweets"));
    //     dbNweets.forEach(document => {
    //         const nweetsObj = {
    //             id:document.id,
    //             ...document.data()
    //         }
    //         setNweets(prev => [nweetsObj, ...prev])
    //     });
    // };
    const getNweetsOnRealTime = () => {
        const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
        setNweets(nweetArr);
        });
    }
    useEffect(() => {
        // getNweets(); 새로고침을 해줘야지 파이어베이스에서 Nweet가 업데이트 된다. 즉, 구식방법이다.
        getNweetsOnRealTime(); // 새로고침을 안해도 실시간으로 Nweet 데이터가 업데이트 된다. 즉, 신식방법이다.
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(dbService, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setNweet("");
    }
    nweets.forEach((value) => console.log(value));
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input value={nweet} onChange={handleNweet} type='text' placeholder="what's on your mind"
                       maxLength={120}/>
                <input type='submit' value='Send Nweet'/>
            </form>
            {nweets.map(value => <Nweet key={value.id} nweetObj={value} isCreator={value.creatorId === userObj.uid}/>)}
        </>
    )
}

export default Home;
