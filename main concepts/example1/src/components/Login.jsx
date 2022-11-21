import React, { useState } from 'react'
import { useEffect } from 'react'
import classes from './Login.module.css'



function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = event => {
        event.preventDefault();
        console.log(email, password);
    }

    useEffect(() => {
        console.log('useEffect')
    }, [])

    return (
        <fieldset >
            <legend>Form Login</legend>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label className={classes.formGroup}>
                    <span className={classes.formLabel}>Email</span>
                    <input className='form-control' type="email" name="email" value={email} onChange={event => {
                        setEmail(event.target.value)
                    }} />
                </label>
                <label className={classes.formGroup}>
                    <span className={classes.formLabel}>Password</span>
                    <input className='form-control' type="password" name="password" value={password} onChange={event => {
                        setPassword(event.target.value)
                    }} />
                </label>
                <button type="submit" onClick={handleSubmit} className={classes.btn}>Login</button>
            </form>
        </fieldset>
    )
}


export default Login