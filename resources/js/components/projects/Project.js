import React, { useState, useRef, useEffect, useCallback } from 'react';
import { mdiChevronDoubleDown, mdiGithub } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function Project({ project, scrollToProject }) {
    const styles = createUseStyles({
        project: {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: [0, 50],
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
                flexDirection: 'row-reverse',
                '@media (max-width: 1200px)': {
                    flexDirection: 'column',
                },
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
            '@media (max-width: 1200px)': {
                flexDirection: 'column',
                padding: '15px 15vw',
                height: 'unset',
                gap: 0,
            },
            '@media (max-width: 768px)': {
                padding: 15,
            },
        },
        preview: {
            flexDirection: 'column',
            display: 'flex',
            flex: 1,
        },
        previewImageWrapper: {
            boxShadow: '0 0 25px 0 rgba(0, 0, 0, 0.25)',
            position: 'relative',
            margin: [30, 0],
            fontSize: 0,
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
            textTransform: 'uppercase',
            pointerEvents: 'none',
            fontFamily: 'Julius',
            position: 'absolute',
            userSelect: 'none',
            letterSpacing: 3,
            fontSize: '2rem',
            color: 'white',
            left: '50%',
            padding: 10,
            opacity: 0,
            top: '55%',
        },
        descriptionWrapper: {
            flex: 1,
        },
        description: {
            justifyContent: 'center',
            flexDirection: 'column',
            fontFamily: 'Poppins',
            alignItems: 'center',
            position: 'relative',
            padding: '0 25%',
            display: 'flex',
            color: 'white',
            '@media (max-width: 1200px)': {
                overflow: 'hidden',
                borderRadius: 10,
                margin: [30, 0],
                padding: 15,
            },
        },
        descriptionTextContent: {
            textAlign: 'justify',
            position: 'relative',
            zIndex: 5,
        },
        descriptionCanvas: {
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            position: 'absolute',
            left: '50%',
            top: '50%',
            '@media (max-width: 1200px)': {
                maxWidth: '200%',
            },
        },
        technologiesWrapper: {
            flexDirection: 'column',
            display: 'flex',
        },
        technologies: {
            justifyContent: 'center',
            flexWrap: 'wrap',
            display: 'flex',
            gap: '20px 0',
        },
        technology: {
            transition: 'transform 0.25s linear',
            margin: [0, 10],
            '&:hover': {
                transform: 'scale(1.1)',
            },
        },
        technologiesText: {
            textTransform: 'uppercase',
            fontFamily: 'RussoOne',
            textAlign: 'center',
            fontSize: '0.75rem',
            letterSpacing: 1,
            marginBottom: 10,
            fontWeight: 100,
        },
        technologiesHr: {
            background: 'linear-gradient(90deg, transparent 0%, black 50%, transparent 100%)',
            marginBottom: 25,
            margin: '0 auto',
            width: 100,
            height: 1,
            border: 0,
        },
        technologyIcon: {
            display: 'flex',
            height: 50,
            width: 50,
        },
        scrollButton: {
            transform: 'translateX(-50%)',
            border: '2px solid black',
            position: 'absolute',
            borderRadius: '50%',
            background: 'none',
            cursor: 'pointer',
            color: 'black',
            left: '50%',
            outline: 0,
            bottom: 30,
            height: 30,
            width: 30,
            '@media (max-width: 1200px)': {
                transform: 'unset',
                position: 'unset',
                bottom: 'unset',
                left: 'unset',
            },
        },
        title: {
            alignSelf: 'flex-start',
            position: 'relative',
            display: 'flex',
            color: 'white',
            zIndex: 5,
        },
        titleText: {
            textTransform: 'uppercase',
            fontFamily: 'Righteous',
            letterSpacing: 1,
            fontSize: '3rem',
            fontWeight: 500,
            '@media (max-width: 768px)': {
                fontSize: '2rem',
            },
        },
        descriptionHr: {
            position: 'relative',
            marginRight: 'auto',
            background: 'white',
            marginBottom: 20,
            marginTop: 10,
            height: 4,
            zIndex: 5,
            border: 0,
            width: 75,
        },
        github: {
            margin: 'auto auto auto 10px',
            color: 'inherit',
            display: 'flex',
            width: '3rem',
            '&:hover': {
                color: 'black',
            },
            '@media (max-width: 768px)': {
                width: '2rem',
            },
        },
        scrollButtonIcon: {

        },
    });
    const classes = styles();

    const [visible, setVisible] = useState(sessionStorage.getItem('fadeProjects'));
    const projectElement = useRef();

    const fadeIn = useCallback(() => {
        if (visible == null && window.scrollY > (projectElement?.current?.offsetTop - window.screen.height * 0.75)) {
            setTimeout(() => {
                setVisible(true);
            }, 250);
        }
    }, [visible, setVisible, projectElement]);

    useEffect(() => {
        sessionStorage.setItem('fadeProjects', false);
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
                    <h2 className={classes.technologiesText}>
                        Technologies
                    </h2>
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
            <div className={classes.descriptionWrapper}>
                <div className={`${classes.description} ${visible ? 'visible' : ''} description`}>
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
