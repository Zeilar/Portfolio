import React, { useState, useEffect } from 'react';
import HeroHeader from './fields/HeroHeader';
import { createUseStyles } from 'react-jss';
import HeroText from './fields/HeroText';
import Field from './Field';

export default function Hero() {
    const styles = createUseStyles({
        hero: {
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
