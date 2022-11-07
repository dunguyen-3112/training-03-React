import React, { useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context'

function FormLogin() {

    const usernameRef = useRef('');
    const passwordRef = useRef('');

    const auth = useContext(AuthContext);

    const handlerLogin = (event) => {
        event.preventDefault();
        auth.handlerLogin(usernameRef.current.value, passwordRef.current.value)
    }
    return (
        <div>
            <form >
                <fieldset>
                    <legend>Login</legend>
                    <label>
                        <span>Username</span>
                        <input type="email" name="username" ref={usernameRef} />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" name="password" ref={passwordRef} />
                    </label>
                    <button type="submit" onClick={handlerLogin}>Login</button>
                </fieldset>
            </form>
        </div>
    )
}

export default FormLogin