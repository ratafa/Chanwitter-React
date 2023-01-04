import React, {useState} from 'react';
import {deleteDoc, updateDoc, doc} from "firebase/firestore";
import {deleteObject, ref, updateMetadata} from "firebase/storage";
import {dbService, storageService} from "../myBase";
import useInput from "../Hooks/useInput";

const Nweet = ({nweetObj, isCreator}) => {
    const [doUpdate, setDoUpdate] = useState(false);
    const [newNweet, handleNewNweet, setNewNweet] = useInput(nweetObj.nweet);

    const firebaseEditFunc = async (value) => {
        // eslint-disable-next-line default-case
        switch (value) {
            case 'delete' :
                await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
                break;
            case 'update' :
                await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
                    text: newNweet
                });
                break;
        }
    }
    const firebaseDeleteFunc = async () => {
        if (nweetObj.attachmentUrl) await deleteObject(ref(storageService, nweetObj.attachmentUrl));
        await updateMetadata(ref( storageService, nweetObj.attachmentUrl))
        await firebaseEditFunc('delete');
    }
    const handleDoUpdateValue = () => setDoUpdate(prev => !prev);
    const handleDelete = async () => {
        const sign = window.confirm("해당 게시물을 삭제하시겠습니까?");
        sign ? await firebaseDeleteFunc() : console.log('cancel');
    }
    const onSubmitEditValue = async (e) => {
        e.preventDefault();
        await firebaseEditFunc('update');
        setDoUpdate(false);
    }

    return (
        <>
            {doUpdate ? (
                <>
                    <form onSubmit={onSubmitEditValue}>
                        <input type='text' value={newNweet} onChange={handleNewNweet}/>
                        <input type='submit' value='update Nweet'/>
                    </form>
                    <button onClick={handleDoUpdateValue}>Cancel</button>
                </>) : (
                <div>
                    <h4>{nweetObj.text}</h4>
                    {
                        nweetObj.attachmentUrl &&
                        <img src={nweetObj.attachmentUrl} alt='' width="50px" height="50px"/>
                    }
                    {
                        isCreator && (
                            <>
                                <button onClick={handleDelete}>Delete</button>
                                <button onClick={handleDoUpdateValue}>Edit</button>
                            </>
                        )}
                </div>
            )
            }
        </>
    )
}

export default Nweet;
