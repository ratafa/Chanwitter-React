import React, {useEffect, useRef, useState} from 'react';
import AppRouter from "./routes/Router";
import { auth } from "./myBase";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
useEffect(() => {
    auth.onAuthStateChanged((user) => {
        // onAuthStateChanged는 firebase에서 유저가 로그인했는지 확인하는 auth 메서드입니다.
        setIsLoggedIn(!!user); // user가 있다면 true, 없다면 false를 반환합니다.
        setUserObj(user);
        setInit(true);
    })
}, [])
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : <div>Loading...</div>}
        </>
    );
}

export default App;
