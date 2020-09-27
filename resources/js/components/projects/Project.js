import React, { useState, useRef, useEffect, useCallback } from 'react';
import { mdiChevronDoubleDown, mdiGithub } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function Project({ project, scrollToProject }) {
    const styles = createUseStyles({
        project: {
            'justify-content': 'center',
            'align-items': 'center',
            position: 'relative',
            padding: '0 50px',
            display: 'flex',
            height: '100vh',
            gap: '50px',
            '& .preview, & .description': {
                transition: 'all 0.5s ease-out',
                opacity: 0,
                '&.visible': {
                    transform: 'translateX(0)',
                    opacity: 1,
                }
            },
            '&:nth-child(even)': {
                background: 'rgb(250, 250, 250)',
                'flex-direction': 'row-reverse',
                '& .preview': {
                    transform: 'translateX(45px)',
                },
                '& .description': {
                    transform: 'translateX(-45px)',
                },
            },
            '&:nth-child(odd)': {
                '& .preview': {
                    transform: 'translateX(-45px)',
                },
                '& .description': {
                    transform: 'translateX(45px)',
                },
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
            background: 'rgba(0, 0, 0, 0.75)',
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
            color: 'white',
        },
        descriptionTextContent: {
            position: 'relative',
            'z-index': 5,
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
            'font-weight': 100,
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
            bottom: '80px',
            height: '30px',
            color: 'black',
            width: '30px',
            left: '50%',
            outline: 0,
        },
        title: {
            'align-items': 'baseline',
            position: 'relative',
            display: 'flex',
            color: 'white',
            'z-index': 5,
        },
        titleText: {
            'text-transform': 'uppercase',
            'font-family': 'Righteous',
            'letter-spacing': '1px',
            'font-size': '3rem',
            'font-weight': 500,
        },
        descriptionHr: {
            'margin-bottom': '20px',
            'margin-top': '10px',
            position: 'relative',
            background: 'white',
            height: '4px',
            width: '75px',
            'z-index': 5,
            border: 0,
        },
        github: {
            'margin': 'auto auto auto 10px',
            color: 'inherit',
            display: 'flex',
            width: '3rem',
            '&:hover': {
                color: 'black',
            },
        },
        scrollButtonIcon: {

        },
    });
    const classes = styles();

    const [visible, setVisible] = useState(sessionStorage.getItem('fadeProjects'));
    const projectElement = useRef();

    const fadeIn = useCallback(() => {
        if (visible == null && window.scrollY > (projectElement?.current?.offsetTop - window.screen.height / 2)) {
            sessionStorage.setItem('fadeProjects', false);
            setVisible(true);
        }
    }, [visible, setVisible, projectElement]);

    useEffect(() => {
        window.addEventListener('scroll', fadeIn);
        fadeIn();
    }, [projectElement, fadeIn]);

    return (
        <article className={`${classes.project} project`} ref={projectElement}>
            <div className={`${classes.preview} ${visible ? 'visible' : ''} preview`}>
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
            <div className={`${classes.description} ${visible ? 'visible' : ''} description`}>
                <div className={classes.descriptionText}>
                    <div className={classes.title}>
                        <h1 className={classes.titleText}>
                            {project.title}
                        </h1>
                        <a className={classes.github} href={project.github} target="_blank" title="GitHub repository">
                            <Icon path={mdiGithub} />
                        </a>
                    </div>
                    <hr className={classes.descriptionHr} />
                    <p className={classes.descriptionTextContent} dangerouslySetInnerHTML={{ __html: project.description }} />
                    <img className={classes.descriptionCanvas} src={`/storage/projects_canvas/${project.canvas}.png`} alt="Text background canvas" />
                </div>
            </div>

            <button className={`${classes.scrollButton} scrollButton`} onClick={() => scrollToProject(project)}>
                <Icon className={classes.scrollButtonIcon} path={mdiChevronDoubleDown} />
            </button>
        </article>
    );
}
