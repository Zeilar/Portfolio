import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function NotFound() {
    const styles = createUseStyles({
        header: {
            fontFamily: 'Barlow',
            fontSize: '4rem',
            margin: 'auto',
        },
    });
    const classes = styles();

    return (
        <h1 className={classes.header}>
            404 Not Found
        </h1>
    );
}