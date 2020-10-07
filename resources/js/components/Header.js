import HeroHeaderSmall from './fields/header/HeroHeaderSmall';
import HeroHeaderBig from './fields/header/HeroHeaderBig';
import HeroButton from './fields/header/HeroButton';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Field from './Field';

export default function Header() {
    const styles = createUseStyles({
        header: {
            backgroundImage: 'url("./storage/images/hero.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            display: 'flex',
            height: '100vh',
            '@media (max-width: 1200px)': {
                
            },
            '@media (max-width: 768px)': {
                
            },
        },
        hero: {
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            width: '100%',
        },
    });
    const classes = styles();

    return (
        <header className={classes.header}> 
            <div className={classes.hero}>
                <HeroHeaderBig />
                <Field fieldName="heroButton" Render={HeroButton} />
            </div>
        </header>
    );
}
