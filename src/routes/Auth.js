import React, {useState} from "react";
import useInput from "../Hooks/useInput";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider, GithubAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {auth} from "../myBase";

const Auth = () => {
    const [email, handleEmail, setEmail] = useInput("");
    const [password, handlePassword, setPassword] = useInput("");
    const [newAccount, setNewAccount] = useState(true);
    const [authError, setAuthError] = useState('');

    const socialAccountList = {
        google: new GoogleAuthProvider(),
        github: new GithubAuthProvider(),
    }
    const handleAccount = () => setNewAccount(prev => !prev);
    const onSubmit = async (e) => {
        const auth = getAuth();
        e.preventDefault(); // 만약 전송하기 클릭 시, 새로고침이 된다면 기존이 입력했던 아이디와 비밀번호가 초기화되니 새로고침을 방지해준다.
        try {
            newAccount ?
                await createUserWithEmailAndPassword(auth, email, password) :
                await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            setAuthError(error.message);
        }
    }

    const handleSocialAccount = async (e) => {
        console.log(e.target.name); // button에 name이라는 속성으로 google, github라는 값을 넣었기에 e.target.name으로 접근 가능하다.
        const {target: {name}} = e; // 디스트럭쳐링 문법을 연속으로 사용한 것으로 e.target.name에서 name으로 2단 점프하여 접근할 때 이렇게 사용 가능하다.
        const provider = socialAccountList[name];
        await signInWithPopup(auth,provider);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={handleEmail}/>
                <input name="password" type="password" placeholder="Password" required value={password}
                       onChange={handlePassword}/>
                <input type="submit" value={newAccount ? "회원가입" : "로그인"}/>
            </form>
            <button onClick={handleAccount}>{newAccount ? "로그인 하기" : "회원가입 하기"}</button>
            <div>{authError}</div>
            <div>
                <button onClick={handleSocialAccount} name="google">Continue with Google</button>
                <button onClick={handleSocialAccount} name="github">Continue with GitHub</button>
            </div>
        </>
    )
}
export default Auth;
