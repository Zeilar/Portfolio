import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { mdiLoading } from '@mdi/js';
import Project from './Project';
import Icon from '@mdi/react';

export default function Projects() {
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

    const [projects, setProjects] = useState();
    const projectsElements = useRef();

    async function getProjects() {
        await fetch('/api/projects')
            .then(response => response.json())
            .then(projects => setProjects(projects));
    }

    function scrollToProject(fromProject) {
        const from = projects.indexOf(fromProject);
        const to = projects.indexOf(projects[from + 1]);
        const toElement = projectsElements.current.children[to];
        window.scrollTo(0, toElement.offsetTop);
    }

    useEffect(() => {
        if (projects == null) getProjects();
    }, [projects, setProjects]);

    return (
        <div className={classes.projects} ref={projectsElements}>
            {
                projects?.length
                    ? projects?.map(project => <Project key={project.id} scrollToProject={scrollToProject} project={project} />)
                    : <Icon size={4} path={mdiLoading} spin={1} />
            }
        </div>
    );
}
