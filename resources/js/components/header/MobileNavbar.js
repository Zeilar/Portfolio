import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function MobileNavbar() {
    const styles = createUseStyles({
        navbar: {
            display: 'none',
            '@media (max-width: 768px)': {
                display: 'flex',
            },
        },
    });
    const classes = styles();

    const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);

    useEffect(() => {
        document.querySelector('html').style.overflowY = mobileNavbarOpen ? 'hidden' : 'visible';
    }, [mobileNavbarOpen]);

    return (
        <div className={`${classes.navbar} ${mobileNavbarOpen ? 'open': ''}`}>
            <button onClick={() => setMobileNavbarOpen(p => !p)}>
                Toggle
            </button>
            <nav className={classes.mobileNavbarbar}>
                Mobile nav
            </nav>
        </div>
    );
}