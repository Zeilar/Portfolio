import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const styles = createUseStyles({
        header: {
            transition: 'box-shadow 0.15s linear, background 0.15s linear',
            padding: '20px 25vw',
            background: 'white',
            position: 'sticky',
            'z-index': '100',
            display: 'flex',
            top: 0,
            '&.background': {
                'box-shadow': '0 0 15px 0px rgba(0, 0, 0, 0.25)',
            },
        },
        navbar: {
            'margin-left': 'auto',
            display: 'flex',
        },
        navlist: {
            'align-items': 'center',
            display: 'flex',
        },
        navitem: {
            margin: '0 20px',
        },
        navlink: {
            color: 'var(--color-primary)',
            position: 'relative',
            padding: '20px 10px',
            '&::after': {
                transition: 'width 0.15s ease-out',
                background: 'var(--color-primary)',
                position: 'absolute',
                content: '""',
                height: '2px',
                bottom: 0,
                width: 0,
                left: 0,
            },
            '&:hover::after, &.active::after': {
                width: '100%',
            },
            '&:hover': {
                'text-decoration': 'none',
            },
            '&.active': {
                color: 'var(--color-secondary)',
            },
            '&.active::after': {
                background: 'var(--color-secondary)',
            }
        },
        brand: {
            'align-self': 'center',
        }
    });
    const classes = styles();

    const [hasBackground, setHasBackground] = useState(false);
    const header = useRef();

    window.addEventListener('scroll', () => {
        setHasBackground(window.scrollY > header?.current?.getBoundingClientRect().height ? true : false);
    });

    return (
        <header className={`${classes.header}${hasBackground ? ' background' : ''}`} ref={header}>
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
        </header>
    );
}