import { mdiClose, mdiExitToApp, mdiMenu } from '@mdi/js';
import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import Icon from '@mdi/react';

export default function Menu() {
    const styles = createUseStyles({
        header: {

        },
        navbar: {
            backgroundColor: 'rgb(15, 15, 15)',
            transition: 'all 0.25s linear',
            boxShadow: '0 0 8px 0 black',
            position: 'relative',
            position: 'fixed',
            height: '100vh',
            width: '20vw',
            zIndex: 100,
            right: 0,
            top: 0,
            '&.closed': {
                transform: 'translateX(calc(100% + 10px))',
            },
            '@media (max-width: 1200px)': {
                width: '35%',
            },
            '@media (max-width: 768px)': {
                width: '65%',
            },
        },
        open: {
            transition: 'all 0.1s linear',
            position: 'fixed',
            color: 'inherit',
            display: 'flex',
            zIndex: 100,
            width: 40,
            right: 40,
            top: 40,
            '&:hover': {
                color: 'white',
            },
            '@media (max-width: 768px)': {
                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.25)',
                backgroundColor: 'var(--color-bg)',
                borderRadius: 4,
                right: 10,
                top: 10,
            },
        },
        icon: {

        },
        navlist: {
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            padding: 20,
        },
        navitem: {
            margin: [10, 0],
        },
        navlink: {
            textAlign: 'center',
            color: 'inherit',
            display: 'flex',
            '&:hover, &.active': {
                transform: 'scale(1.03)',
                textDecoration: 'none',
                color: 'white',
            },
        },
        login: {
            flexDirection: 'column',
            fontSize: '1rem',
            display: 'flex',
            padding: 20,
        },
        loginHeader: {
            fontSize: '1.5rem',
            marginBottom: 10,
            '@media (max-width: 768px)': {
                fontSize: '1.25rem',
            },
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
            letterSpacing: 1,
            color: 'inherit',
            marginTop: 10,
            '&:focus': {
                boxShadow: '0 0 0 1px var(--color-primary)',
            },
        },
        logout: {
            transition: 'all 0.1s linear',
            alignItems: 'center',
            width: 'fit-content',
            fontSize: '1.5rem',
            color: 'inherit',
            display: 'flex',
            '&:hover': {
                color: 'var(--color-primary)',
            },
            '@media (max-width: 768px)': {
                fontSize: '1.25rem',
            },
        },
        logoutIcon: {
            width: '1.5rem',
            marginLeft: 5,
            '@media (max-width: 768px)': {
                fontSize: '1.25rem',
            },
        },
        error: {
            marginTop: 15,
            color: 'red',
        },
        divider: {
            backgroundColor: 'rgb(30, 30, 30)',
            width: 'calc(100% - 40px)',
            margin: '10px auto',
            borderRadius: 4,
            border: 0,
            height: 2,
        },
        close: {
            transition: 'all 0.1s linear',
            position: 'absolute',
            color: 'inherit',
            display: 'flex',
            width: 40,
            right: 10,
            top: 10,
            '&:hover': {
                color: 'white',
            },
        },
    });
    const classes = styles();

    const [user, setUser] = useState(sessionStorage.getItem('user'));
    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [open, setOpen] = useState(false);
    const username = useRef();
    const password = useRef();

    function loginSubmit(e) {
        e.preventDefault();

        if (username.current.value !== '' && password.current.value !== '') {
            login();
        }

        setUsernameError(username.current.value === '' ? 'This field is required' : false);
        setPasswordError(password.current.value === '' ? 'This field is required' : false);
    }

    function logout() {
        sessionStorage.removeItem('user');
        location.href = '/api/logout';
    }

    function closeNav() {
        setOpen(false);
    }

    function openNav() {
        setOpen(true);
    }
    
    function closeOnNavLink() {
        if (window.innerWidth <= 1200) {
            setOpen(false);
        }
    }

    function loginView() {
        return user
            ? <button className={classes.logout} onClick={logout}>
                <span>Logout</span>
                <Icon className={classes.logoutIcon} path={mdiExitToApp} />
            </button>
            : <>
                <p className={classes.loginHeader}>
                    Login
                </p>

                <form className={classes.inputs} onSubmit={loginSubmit}>
                    {usernameError && <p className={classes.error}>{usernameError}</p>}
                    <input className={classes.input} type="text" placeholder="Username" ref={username} />

                    {passwordError && <p className={classes.error}>{passwordError}</p>}
                    <input className={classes.input} type="password" placeholder="Password" ref={password} />

                    <button className={classes.loginSubmit} onClick={loginSubmit}>
                        Login
                    </button>
                </form>
            </>
    }

    async function login() {
        const args = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.querySelector('[name=_token]').getAttribute('content'),
            },
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
            <button className={classes.open} onClick={openNav} title="Open">
                <Icon className={classes.icon} path={mdiMenu} />
            </button>

            <nav className={`${classes.navbar} ${!open ? 'closed' : ''}`}>
                <button className={classes.close} onClick={closeNav} title="Close">
                    <Icon className={classes.icon} path={mdiClose} />
                </button>

                <div className={classes.login}>
                    { loginView() }
                </div>

                <hr className={classes.divider} />

                <ul className={classes.navlist}>
                    <li className={classes.navitem}>
                        <NavLink className={classes.navlink} onClick={closeOnNavLink} to="/" exact>
                            Home
                        </NavLink>
                    </li>
                    <li className={classes.navitem}>
                        <NavLink className={classes.navlink} onClick={closeOnNavLink} to="/about">
                            About me
                        </NavLink>
                    </li>
                    <li className={classes.navitem}>
                        <NavLink className={classes.navlink} onClick={closeOnNavLink} to="/cases">
                            Cases
                        </NavLink>
                    </li>
                    <li className={classes.navitem}>
                        <a className={classes.navlink} href="/storage/CV.pdf" target="_blank">
                            CV
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}