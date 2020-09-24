import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Project from './Project';

export default function Projects() {
    const styles = createUseStyles({
        projects: {
            
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
            {projects?.map(project => <Project key={project.id} scrollToProject={scrollToProject} project={project} />)}
        </div>
    );
}
