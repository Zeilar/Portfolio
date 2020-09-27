import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { mdiLoading } from '@mdi/js';
import Project from './Project';
import Header from '../Header';
import Icon from '@mdi/react';

export default function Projects({ projects }) {
    const styles = createUseStyles({
        projects: {
            'justify-content': 'center',
            'flex-direction': 'column',
            'align-items': 'center',
            display: 'flex',
            flex: 1,
        },
    });
    const classes = styles();

    const projectsElements = useRef();

    function scrollToProject(fromProject) {
        const from = projects.indexOf(fromProject);
        const to = projects.indexOf(projects[from + 1]);
        const toElement = projectsElements.current.children[to];
        window.scrollTo(0, toElement.offsetTop);
    }

    return (
        <>
            <Header style={{ position: 'fixed' }} />
            <div className={classes.projects} ref={projectsElements}>
                {
                    projects?.length
                        ? projects?.map(project => <Project key={project.id} scrollToProject={scrollToProject} project={project} />)
                        : <Icon size={2} path={mdiLoading} spin={1} />
                }
            </div>
        </>
    );
}
