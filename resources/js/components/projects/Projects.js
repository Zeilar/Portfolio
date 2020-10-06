import React, { useRef, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { mdiLoading } from '@mdi/js';
import Project from './Project';
import Icon from '@mdi/react';

export default function Projects({ user }) {
    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height;

    const styles = createUseStyles({
        projects: {
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            '@media (max-width: 1200px)': {
                marginTop: headerHeight,
            },
            '@media (max-width: 768px)': {
                marginTop: 0,
            },
        },
    });
    const classes = styles();

    const [projects, setProjects] = useState();
    const projectsElements = useRef();
    
    async function getProjects() {
        await fetch('/api/projects')
            .then(response => response.json())
            .then(projects => setProjects(projects));
    }

    function scrollToNextProject(fromProject) {
        const from = projects.indexOf(fromProject);
        const to = projects.indexOf(projects[from + 1]);
        const toElement = projectsElements.current.children[to];
        window.scrollTo(0, toElement.offsetTop);
    }

    useEffect(() => {
        if (projects == null) getProjects();
    });

    return (
        <>
            <section className={classes.projects} ref={projectsElements}>
                {
                    projects?.length
                        ? projects?.map(project => <Project key={project.id} scrollToNextProject={scrollToNextProject} project={project} />)
                        : <Icon size={2} path={mdiLoading} spin={1} />
                }
            </section>
        </>
    );
}
