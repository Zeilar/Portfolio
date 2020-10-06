import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Projects from './projects/Projects';
import Header from './header/Header';

export default function Index() {
    return (
        <>
            <Header />
            <Projects />  
        </>
    );
}