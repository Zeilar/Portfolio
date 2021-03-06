import HeroHeader from './fields/HeroHeader';
import { createUseStyles } from 'react-jss';
import HeroText from './fields/HeroText';
import React, { useState } from 'react';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
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
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            display: 'flex',
            height: '100vh',
            padding: 15,
            '&.done': {
                animation: '$fadeIn 0.75s ease-out forwards',
            },
        },
        icon: {
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            width: '4rem',
            left: '50%',
            top: '50%',
        }
    });
    const classes = styles();

    const [headerLoaded, setHeaderLoaded] = useState(false);
    const [textLoaded, setTextLoaded] = useState(false);

    return (
        <section className={`${classes.hero} ${headerLoaded && textLoaded ? 'done' : ''}`}>
            {(!headerLoaded || !textLoaded) && <Icon className={classes.icon} path={mdiLoading} spin={1} />}
            <Field fieldName="heroHeader" render={HeroHeader} props={{ setHeaderLoaded: setHeaderLoaded }} />
            <Field fieldName="heroText" render={HeroText} props={{ setTextLoaded: setTextLoaded }} />
        </section>
    );
}
