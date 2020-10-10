import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Projects from './Projects';
import Header from './Hero';

export default function Index() {
    return (
        <>
            <Header />
            <Projects />
        </>
    );
}