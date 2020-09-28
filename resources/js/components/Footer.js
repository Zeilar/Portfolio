import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function Footer() {
    const styles = createUseStyles({
        footer: {

        },
    });
    const classes = styles();

    return (
        <footer className={classes.footer}>
            
        </footer>
    );
}
