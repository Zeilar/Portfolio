import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

export default function Footer() {
    const styles = createUseStyles({
        footer: {
            justifyContent: 'center',
            fontFamily: 'Montserrat',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            padding: 30,
        },
        header: {
            fontSize: '2rem',
        },
        divider: {
            backgroundColor: 'var(--color-primary)',
            marginTop: 10,
            width: 100,
            height: 2,
            border: 0,
        },
        medias: {
            display: 'flex',
            marginTop: 20,
        },
        media: {
            transition: 'all 0.25s linear',
            display: 'flex',
            margin: 15,
            width: 30,
            '&:hover': {
                transform: 'scale(1.1)',
            },
        },
        mediaIcon: {
            width: '100%',
        },
        copyright: {
            fontSize: '1rem',
            marginTop: 30,
        },
    });
    const classes = styles();

    return (
        <footer className={classes.footer}>
            <h2 className={classes.header}>
                Get in touch
            </h2>

            <hr className={classes.divider} />

            <div className={classes.medias}>
                <a className={classes.media} href="mailto:philip@angelin.dev" target="_blank" title="philip@angelin.dev">
                    <img className={classes.mediaIcon} src="/storage/medias/email.svg" alt="Email" />
                </a>
                <a className={classes.media} href="tel:+46733879645" target="_blank" title="+46 73 387 96 45">
                    <img className={classes.mediaIcon} src="/storage/medias/phone.svg" alt="Phone" />
                </a>
                <a className={classes.media} href="https://www.linkedin.com/in/philip-angelin-a36b50138/" target="_blank" title="Philip Angelin">
                    <img className={classes.mediaIcon} src="/storage/medias/linkedin.svg" alt="Linkedin" />
                </a>
                <a className={classes.media} href="https://github.com/Zeilar" target="_blank" title="Zeilar">
                    <img className={classes.mediaIcon} src="/storage/medias/github.svg" alt="GitHub" />
                </a>
                <a className={classes.media} href="https://www.discord.com" target="_blank" title="Zeilar#2288">
                    <img className={classes.mediaIcon} src="/storage/medias/discord.svg" alt="Discord" />
                </a>
            </div>

            <p className={classes.copyright}>
                Philip Angelin © 2020
            </p>
        </footer>
    );
}
