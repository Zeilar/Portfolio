import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import AnchorLink from '../AnchorLink';

export default function Navbar() {
    const styles = createUseStyles({
        navbar: {
            display: 'flex',
            margin: 'auto',
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
    });
    const classes = styles();

    return (
        <nav className={classes.navbar}>
            <ul className={classes.navlist}>
                <li className={classes.navitem}>
                    <AnchorLink className={classes.navlink} to="contact">
                        Contact
                    </AnchorLink>
                </li>
            </ul>
        </nav>
    );
}