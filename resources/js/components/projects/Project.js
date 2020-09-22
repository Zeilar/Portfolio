import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function Project({ project }) {
    const styles = createUseStyles({
        project: {

        },
        technologies: {
            border: '1px solid red',
        },
        technology: {

        },
        technologyIcon: {
            display: 'flex',
            height: '50px',
            width: '50px',
        },
    });
    const classes = styles();

    return (
        <article className={classes.project}>
            <div className={classes.technologies}>
                {
                    project.technologies.map(technology => (
                        <div className={classes.technology} key={Math.random()}>
                            <span className={classes.technologyIcon} dangerouslySetInnerHTML={{ __html: technology.logo }} title={technology.name} />
                        </div>
                    ))
                }
            </div>
        </article>
    );
}