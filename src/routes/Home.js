import React, {useEffect, useState} from "react";
import useInput from "../Hooks/useInput";
import {v4 as uuidv4} from "uuid";
import {dbService, storageService} from "../myBase";
import {ref, uploadString, getDownloadURL} from "firebase/storage";
import {addDoc, collection, query, onSnapshot, orderBy} from "firebase/firestore";
import Nweet from "../components/Nweet";

const Home = ({userObj}) => {
    const [nweet, handleNweet, setNweet] = useInput('');
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
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
    const handleImgFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const finishedResult = finishedEvent.currentTarget.result;
            setAttachment(finishedResult);
        };
        console.log(attachment);
        reader.readAsDataURL(file);
    }
    useEffect(() => {
        // getNweets(); 새로고침을 해줘야지 파이어베이스에서 Nweet가 업데이트 된다. 즉, 구식방법이다.
        getNweetsOnRealTime(); // 새로\고침을 안해도 실시간으로 Nweet 데이터가 업데이트 된다. 즉, 신식방법이다.
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        console.log(!!attachment);
        if (attachment !== '') {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        console.log(attachmentUrl);
        const sendedNweet = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
            // 객체로 데이터를 보낼 때, attachmenUrl처럼 선택적으로 보내는 데이터는 ""의 빈 값으로 할당까지 해줘야한다.
            // let attachment; 이런 식으로 할당만 하면 에러가 난다...
        }
        await addDoc(collection(dbService, "nweets"), sendedNweet);
        setNweet("");
        setAttachment("");
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input value={nweet} onChange={handleNweet} type='text' placeholder="what's on your mind"
                       maxLength={120}/>
                <input type='file' accept='image/*' onChange={handleImgFile}/>
                <input type='submit' value='Send Nweet'/>
                {attachment &&
                    <div>
                        <img alt="" src={attachment} width="50px" height="50px"/>
                        <button onClick={() => setAttachment("")}>Clear Image</button>
                    </div>}
            </form>
            {
                nweets.map(value =>
                    <Nweet
                        key={value.id}
                        nweetObj={value}
                        isCreator={value.creatorId === userObj.uid}
                    />)
            }
        </>
    )
}
export default Home;
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
