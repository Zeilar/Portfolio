import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

export default function Contact() {
    const styles = createUseStyles({
        footer: {

        },
        header: {

        },
    });
    const classes = styles();

    return (
        <footer className={classes.footer}>
            <h3 className={classes.header}>
                Get in touch
            </h3>
            <div className="medias">
                <div className="media">
                    
                </div>
                <div className="media">

                </div>
                <div className="media">

                </div>
                <div className="media">

                </div>
                <div className="media">

                </div>
            </div>
        </footer>
    );
}