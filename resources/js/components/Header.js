import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
    const styles = createUseStyles({
        header: {
            transition: 'box-shadow 0.1s linear',
            padding: '20px 25vw',
            background: 'white',
            position: 'sticky',
            display: 'flex',
            width: '100%',
            zIndex: 100,
            top: 0,
            '&.background': {
                boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.25)',
                background: 'white',
            },
            '@media (max-width: 1200px)': {
                padding: '20px 15vw',
            },
            '@media (max-width: 768px)': {
                background: 'none',
                padding: 0,
            },
        },
        mobileNav: {
            position: 'fixed',
            display: 'none',
            right: 0,
            top: 0,
            '@media (max-width: 768px)': {
                display: 'flex',
            },
        },
        navbar: {
            marginLeft: 'auto',
            display: 'flex',
            '@media (max-width: 768px)': {
                display: 'none',
            },
        },
        navlist: {
            alignItems: 'center',
            display: 'flex',
        },
        navitem: {
            margin: [0, 20],
        },
        navlink: {
            position: 'relative',
            userSelect: 'none',
            padding: [20, 10],
            color: 'black',
            '&:hover': {
                color: 'var(--color-link)',
                textDecoration: 'none',
            },
            '&.active': {
                color: 'var(--color-link)',
            },
        },
        brand: {
            alignSelf: 'center',
            '@media (max-width: 768px)': {
                display: 'none',
            },
        }
    });
    const classes = styles();

    const [hasBackground, setHasBackground] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const header = useRef();

    window.addEventListener('scroll', () => {
        setHasBackground(window.scrollY > header?.current?.getBoundingClientRect().height ? true : false);
    });

    useEffect(() => {
        document.querySelector('html').style.overflowY = mobileNavOpen ? 'hidden' : 'visible';
    }, [mobileNavOpen]);

    return (
        <header className={`${classes.header}${hasBackground ? ' background' : ''}`} ref={header} {...props}>
            <span className={classes.brand}>
                Philip Angelin
            </span>
            <nav className={classes.navbar}>
                <ul className={classes.navlist}>
                    <li className={classes.navitem}>
                        <NavLink className={classes.navlink} to="/" exact>
                            Home
                        </NavLink>
                    </li>
                    <li className={classes.navitem}>
                        <NavLink className={classes.navlink} to="/projects" exact>
                            Projects
                        </NavLink>
                    </li>
                    <li className={classes.navitem}>
                        <NavLink className={classes.navlink} to="/about" exact>
                            About
                        </NavLink>
                    </li>
                    <li className={classes.navitem}>
                        <NavLink className={classes.navlink} to="/contact" exact>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className={classes.mobileNav}>
                <button onClick={() => setMobileNavOpen(p => !p)}>
                    Toggle
                </button>
                <nav className={classes.mobileNavbar}>
                    Mobile nav
                </nav>
            </div>
        </header>
    );
}
