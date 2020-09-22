import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import Project from './Project';

export default function Projects() {
    const styles = createUseStyles({
        projects: {

        },
    });
    const classes = styles();

    const [projects, setProjects] = useState();

    async function getProjects() {
        await fetch('/api/projects')
            .then(response => response.json())
            .then(projects => setProjects(projects));
    }

    useEffect(() => {
        if (projects == null) getProjects();
        console.log(projects);
    }, [projects, setProjects]);

    return (
        <div className={classes.projects}>
            {projects?.map(project => <Project key={project.id} project={project} />)}
        </div>
    );
}