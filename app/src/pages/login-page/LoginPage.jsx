import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import classes from './LoginPage.module.sass'
import { FormLogin } from './form-login';
import { Text } from '../../components/ui/text';

import Type from '../../data/TextType.json'
import { Logo } from '../../components/ui/logo';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [data, loading, error] = useFetch({
        url: '/login',
        method: 'POST',
        json: {
            email,
            password
        }

    });

    const handleLogin = (email, password) => {
        setEmail(email)
        setPassword(password)
    }




    return (
        <main data-login="false" className={classes["login-page"]}>
            <header className={classes['header']}>
                <Logo col />
                <Text font={Type[700][24]} tag="h1">Log In to Dashboard Kit</Text>
                <Text font={Type[400][14]} tag="h3" gray>Enter your email and password below</Text>
            </header>
            <FormLogin onLogin={handleLogin} />
            <footer className={classes.footer}>
                <Text tag="span" font={Type[400][14]}>Don't have an account?</Text>
                <a href="/signup" >
                    <Text font={Type[600][14]} tag="span" >Sign Up</Text>
                </a>
            </footer>
        </main>
    );
};


LoginPage.propTypes = {
    onLogin: PropTypes.func.isRequired
};


export default LoginPage;
