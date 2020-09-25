import React, { useState, useRef, useEffect, useCallback } from 'react';
import { mdiArrowDownCircleOutline, mdiChevronDoubleDown } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function Project({ project, scrollToProject }) {
    const styles = createUseStyles({
        project: {
            'justify-content': 'center',
            'align-items': 'center',
            padding: '150px 100px',
            position: 'relative',
            display: 'flex',
            gap: '50px',
            '&:nth-child(even)': {
                'flex-direction': 'row-reverse',
            },
            '&:nth-child(odd)': {
                background: 'rgb(250, 250, 250)',
            },
        },
        preview: {
            'flex-direction': 'column',
            display: 'flex',
            flex: 1,
        },
        previewImageWrapper: {
            'box-shadow': '0 0 25px 0 rgba(0, 0, 0, 0.25)',
            position: 'relative',
            margin: '30px 0',
            'font-size': 0,
        },
        previewImage: {
            transition: 'filter 0.1s linear',
            '&:hover': {
                filter: 'blur(3px) grayscale(100%)',
            },
            '&:hover ~ span': {
                opacity: 1,
                top: '50%',
            }
        },
        previewImageText: {
            transition: 'opacity 0.1s linear, top 0.2s linear',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.65)',
            'text-transform': 'uppercase',
            'pointer-events': 'none',
            'letter-spacing': '3px',
            'font-family': 'Julius',
            'user-select': 'none',
            position: 'absolute',
            'font-size': '2rem',
            padding: '10px',
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
            'font-family': 'Poppins',
            'text-align': 'justify',
            position: 'relative',
            padding: '0 25%',
        },
        descriptionTextContent: {
            position: 'relative',
            'z-index': '5',
        },
        descriptionCanvas: {
            transform: 'translate(-50%, -50%)',
            'pointer-events': 'none',
            position: 'absolute',
            left: '50%',
            top: '50%',
        },
        technologiesWrapper: {
            'flex-direction': 'column',
            display: 'flex',
        },
        technologies: {
            'justify-content': 'center',
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
            'font-family': 'RussoOne',
            'letter-spacing': '1px',
            'margin-bottom': '10px',
            'text-align': 'center',
            'font-size': '0.75rem',
            'font-weight': '100',
        },
        technologiesHr: {
            background: 'linear-gradient(90deg, transparent 0%, black 50%, transparent 100%)',
            'margin-bottom': '25px',
            margin: '0 auto',
            width: '100px',
            height: '1px',
            border: 0,
        },
        technologyIcon: {
            display: 'flex',
            height: '50px',
            width: '50px',
        },
        scrollButton: {
            transform: 'translateX(-50%)',
            border: '2px solid black',
            'border-radius': '50%',
            position: 'absolute',
            background: 'none',
            cursor: 'pointer',
            bottom: '30px',
            color: 'black',
            height: '30px',
            width: '30px',
            left: '50%',
            outline: 0,
        },
        title: {
            'font-family': 'Montserrat',
            'letter-spacing': '1px',
            'text-align': 'center',
            'font-size': '3rem',
            'font-weight': 500,
        },
        scrollButtonIcon: {

        },
    });
    const classes = styles();

    return (
        <article className={`${classes.project} project`}>
            <div className={classes.preview}>
                <h1 className={classes.title}>
                    {project.title}
                </h1>
                <a className={classes.previewImageWrapper} href={project.link} target="_blank">
                    <img className={classes.previewImage} src={project.image} alt="Project preview" />
                    <span className={classes.previewImageText}>
                        Visit
                    </span>
                </a>
                <div className={classes.technologiesWrapper}>
                    <p className={classes.technologiesText}>
                        Technologies
                    </p>
                    <hr className={classes.technologiesHr} />
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
            <div className={classes.description}>
                <p className={classes.descriptionText}>
                    <span className={classes.descriptionTextContent} dangerouslySetInnerHTML={{ __html: project.description }} />
                    <img className={classes.descriptionCanvas} src={`/storage/projects_canvas/${project.canvas}.png`} alt="Text background canvas" />
                </p>
            </div>

            <button className={`${classes.scrollButton} scrollButton`} onClick={() => scrollToProject(project)}>
                <Icon className={classes.scrollButtonIcon} path={mdiChevronDoubleDown} />
            </button>
        </article>
    );
}
