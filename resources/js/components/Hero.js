import React, { useState, useEffect } from 'react';
import HeroHeader from './fields/HeroHeader';
import { createUseStyles } from 'react-jss';
import HeroText from './fields/HeroText';
import Field from './Field';

export default function Hero() {
    const styles = createUseStyles({
        '@keyframes fadeIn': {
            from: {
                transform: 'translateY(-50px)',
                opacity: 0,
            },
            to: {
                transform: 'translateY(0)',
                opacity: 1,
            },
        },
        hero: {
            animation: '$fadeIn 0.75s ease-out forwards',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            height: '100vh',
            padding: 15,
        },
    });
    const classes = styles();

    return (
        <section className={classes.hero}>
            <Field fieldName="heroHeader" render={HeroHeader} />
            <Field fieldName="heroText" render={HeroText} />
        </section>
    );
}
