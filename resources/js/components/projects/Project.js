import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function Project({ project }) {
    const styles = createUseStyles({
        project: {
            display: 'flex',
            padding: '50px',
        },
        preview: {
            'flex-direction': 'column',
            'margin-right': '50px',
            display: 'flex',
            flex: 1,
        },
        previewImageWrapper: {
            position: 'relative',
        },
        previewImage: {
            transition: 'filter 0.1s linear',
            '&:hover': {
                filter: 'blur(3px)',
            },
            '&:hover ~ span': {
                opacity: 1,
                top: '50%',
            }
        },
        previewImageText: {
            transition: 'opacity 0.1s linear, top 0.25s linear',
            transform: 'translate(-50%, -50%)',
            'pointer-events': 'none',
            'letter-spacing': '3px',
            'font-family': 'Julius',
            position: 'absolute',
            'font-size': '2rem',
            color: 'white',
            left: '50%',
            opacity: 0,
            top: '55%',
        },
        description: {
            'justify-content': 'center',
            'flex-direction': 'column',
            'align-items': 'center',
            display: 'flex',
            flex: 1,
        },
        descriptionText: {
            'text-align': 'justify',
        },
        technologiesWrapper: {
            'flex-direction': 'column',
            'margin-top': '60px',
            display: 'flex',
        },
        technologies: {
            'flex-wrap': 'wrap',
            display: 'flex',
            gap: '20px 0',
        },
        technology: {
            transition: 'transform 0.25s linear',
            margin: '0 10px',
            '&:hover': {
                transform: 'scale(1.1)',
            },
        },
        technologiesText: {
            'text-transform': 'uppercase',
            'letter-spacing': '1px',
            'margin-bottom': '15px',
            'text-align': 'center',
            'font-size': '0.75rem',
            'font-weight': '600',
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
                <a className={classes.previewImageWrapper} href={project.link} target="_blank">
                    <img className={classes.previewImage} src={project.image} alt="Project preview" />
                    <span className={classes.previewImageText}>
                        Visit
                    </span>
                </a>
            </div>
            <div className={classes.description}>
                <p className={classes.descriptionText}>
                    {project.description}
                </p>
                <div className={classes.technologiesWrapper}>
                    <p className={classes.technologiesText}>
                        Technologies
                    </p>
                    <div className={classes.technologies}>
                        {
                            project.technologies.map(technology => (
                                <div className={classes.technology} key={Math.random()}>
                                    <a
                                        className={classes.technologyIcon}
                                        dangerouslySetInnerHTML={{ __html: technology.logo }}
                                        title={technology.name}
                                        href={technology.link}
                                        target="_blank"
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </article>
    );
}