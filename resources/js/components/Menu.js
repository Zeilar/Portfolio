import React, { useState, useRef, useEffect } from 'react';
import { mdiClose, mdiExitToApp, mdiMenu } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import Icon from '@mdi/react';

export default function Menu() {
    const styles = createUseStyles({
        header: {
            position: 'fixed',
            height: '100vh',
            width: '20vw',
            right: 0,
            top: 0,
        },
        navbar: {
            backgroundColor: 'rgb(15, 15, 15)',
            position: 'relative',
            height: '100%',
            width: '100%',
            zIndex: 100,
        },
        open: {
            transition: 'all 0.1s linear',
            position: 'fixed',
            color: 'inherit',
            display: 'flex',
            width: 40,
            right: 0,
            top: 0,
            '&:hover': {
                color: 'white',
            },
        },
        close: {
            transition: 'all 0.1s linear',
            color: 'inherit',
            display: 'flex',
            width: 40,
            '&:hover': {
                color: 'white',
            },
        },
        icon: {

        },
        navlist: {
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
        },
        navitem: {
            margin: [10, 0],
        },
        navlink: {
            color: 'inherit',
            display: 'flex',
            '&:hover, &.active': {
                transform: 'scale(1.03)',
                textDecoration: 'none',
                color: 'white',
            },
        },
        login: {
            borderBottom: '4px solid var(--color-bg)',
            flexDirection: 'column',
            fontSize: '1rem',
            display: 'flex',
            padding: 20,
        },
        loginHeader: {
            fontSize: '1.5rem',
            marginBottom: 10,
        },
        inputs: {
            flexDirection: 'column',
            display: 'flex',
        },
        input: {
            border: '1px solid rgb(50, 50, 50)',
            backgroundColor: 'rgb(30, 30, 30)',
            transition: 'all 0.1s linear',
            borderRadius: 2,
            margin: [5, 0],
            padding: 8,
            '&:focus': {
                boxShadow: '0 0 0 1px var(--color-primary)',
            },
        },
        loginSubmit: {
            border: '1px solid rgb(50, 50, 50)',
            backgroundColor: 'rgb(30, 30, 30)',
            transition: 'all 0.1s linear',
            width: 'fit-content',
            padding: [10, 15],
            color: 'inherit',
            marginTop: 5,
            '&:focus': {
                boxShadow: '0 0 0 1px var(--color-primary)',
            },
        },
        logout: {
            transition: 'all 0.1s linear',
            alignItems: 'center',
            color: 'inherit',
            display: 'flex',
            '&:hover': {
                color: 'var(--color-primary)',
            },
        },
        logoutIcon: {
            marginLeft: 5,
            width: '1rem',
        },
        error: {
            marginTop: 15,
            color: 'red',
        },
    });
    const classes = styles();

    const [user, setUser] = useState(sessionStorage.getItem('user'));
    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const username = useRef();
    const password = useRef();

    function checkInputs() {
        setUsernameError(username.current.value === '' ? 'This field is required' : false);
        setPasswordError(password.current.value === '' ? 'This field is required' : false);
    }

    function loginSubmit(e) {
        e.preventDefault();

        if (username.current.value !== '' && password.current.value !== '') {
            login();
        }

        checkInputs();
    }

    function logout() {
        sessionStorage.removeItem('user');
        location.reload();
    }

    async function login() {
        const args = {
            method: 'POST',
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value,
            }),
        };

        await fetch('/api/login', args)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                if (data?.success) {
                    sessionStorage.setItem('user', true);
                    location.reload();
                } else {
                    setUsernameError(data?.field === 'username' ? data.message : false);
                    setPasswordError(data?.field === 'password' ? data.message : false);
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <header className={classes.header}>
            <button className={classes.open}>
                <Icon className={classes.icon} path={mdiMenu} />
            </button>

            <nav className={classes.navbar}>
                <div className={classes.login}>
                    {
                        user
                            ? <>
                                <button className={classes.logout} onClick={logout}>
                                    <span>Logout</span>
                                    <Icon className={classes.logoutIcon} path={mdiExitToApp} />
                                </button>
                            </>
                            : <>
                                <p className={classes.loginHeader}>
                                    Login
                                </p>

                                <form className={classes.inputs} onSubmit={loginSubmit}>
                                    {
                                        usernameError &&
                                            <p className={classes.error}>
                                                {usernameError}
                                            </p>
                                    }
                                    <input className={classes.input} type="text" onChange={checkInputs} placeholder="Username" ref={username} />

                                    {
                                        passwordError &&
                                            <p className={classes.error}>
                                                {passwordError}
                                            </p>
                                    }
                                    <input className={classes.input} type="password" onChange={checkInputs} placeholder="Password" ref={password} />

                                    <button className={classes.loginSubmit} onClick={loginSubmit}>
                                        Login
                                    </button>
                                </form>
                            </>
                    }
                </div>

                <button className={classes.close}>
                    <Icon className={classes.icon} path={mdiClose} />
                </button>

                <ul className={classes.navlist}>
                    <li className={classes.navitem}>
                        <NavLink className={classes.navlink} to="/" exact>
                            Home
                        </NavLink>
                    </li>
                    <li className={classes.navitem}>
                        <NavLink className={classes.navlink} to="/about" exact>
                            About me
                        </NavLink>
                    </li>
                    <li className={classes.navitem}>
                        <NavLink className={classes.navlink} to="/cases" exact>
                            Cases
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}