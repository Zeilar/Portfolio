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
            'letter-spacing': '1px',
            'text-align': 'justify',
            padding: '0 100px',
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
            border: '2px solid rgb(50, 50, 50)',
            transform: 'translateX(-50%)',
            color: 'rgb(50, 50, 50)',
            'border-radius': '50%',
            position: 'absolute',
            background: 'none',
            cursor: 'pointer',
            bottom: '30px',
            height: '30px',
            width: '30px',
            left: '50%',
            outline: 0,
        },
        scrollButtonIcon: {

        },
    });
    const classes = styles();

    return (
        <article className={`${classes.project} project`}>
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

            <button className={`${classes.scrollButton} scrollButton`} onClick={() => scrollToProject(project)}>
                <Icon className={classes.scrollButtonIcon} path={mdiChevronDoubleDown} />
            </button>
        </article>
    );
}
