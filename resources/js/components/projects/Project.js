import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function Project({ project }) {
    const styles = createUseStyles({
        project: {
            display: 'flex',
            padding: '10px',
        },
        preview: {
            'flex-direction': 'column',
            display: 'flex',
            flex: 1,
        },
        description: {
            'flex-direction': 'column',
            display: 'flex',
            flex: 1,
        },
        descriptionText: {
            'text-align': 'justify',
        },
        technologies: {
            display: 'flex',
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
            <div className={classes.preview}>
                <div className={classes.previewImage}>
                    <img src={project.image} alt="Project preview" />
                </div>
                <div className={classes.technologies}>
                    {
                        project.technologies.map(technology => (
                            <div className={classes.technology} key={Math.random()}>
                                <span
                                    className={classes.technologyIcon}
                                    dangerouslySetInnerHTML={{ __html: technology.logo }}
                                    title={technology.name}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={classes.description}>
                <p className={classes.descriptionText}>{project.description}</p>
            </div>
        </article>
    );
}