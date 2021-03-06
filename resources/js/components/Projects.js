import { mdiCheck, mdiClose, mdiLoading, mdiPlus } from '@mdi/js';
import React, { useState, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import Project from './Project';
import Icon from '@mdi/react';

export default function Projects() {
    const styles = createUseStyles({
        projects: {
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            height: '100vh',
        },
        header: {
            fontFamily: 'Montserrat',
            letterSpacing: 1,
            marginBottom: 50,
            fontSize: '3rem',
            '@media (max-width: 1200px)': {
                fontSize: '2.5rem',
            },
            '@media (max-width: 768px)': {
                fontSize: '2rem',
            },
        },
        add: {
            color: 'var(--color-primary)',
            marginTop: 20,
        },
        addInputs: {
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            marginTop: 20,
        },
        addInput: {
            border: '2px solid var(--color-text)',
            backgroundColor: 'rgb(30, 30, 30)',
            transition: 'all 0.1s linear',
            textAlign: 'center',
            padding: [5, 0],
            margin: [10, 0],
            '&:focus': {
                borderColor: 'var(--color-primary)',
            },
        },
        buttons: {
            marginTop: 10,
        },
        addSubmit: {
            
        },
        addCancel: {
            marginLeft: 10,
        },
        loading: {
            width: '4rem',
        },
    });
    const classes = styles();

    const [adding, setAdding] = useState(false);
    const [projects, setProjects] = useState();
    const projectTitle = useRef();
    const projectLink = useRef();

    const [user, setUser] = useState(sessionStorage.getItem('user'));

    async function getProjects() {
        await fetch('/api/projects')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(projects => setProjects(projects))
            .catch(error => console.log(error));
    }

    function submitProject(e) {
        if (e.key === 'Enter') addProject();
    }

    async function addProject() {
        if (!projectTitle.current.value || !projectLink.current.value) return;

        const args = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.querySelector('[name=_token]').getAttribute('content'),
            },
            body: JSON.stringify({
                title: projectTitle.current?.value,
                link: projectLink.current?.value,
            }),
        };

        await fetch('/api/projects', args)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(project => {
                if (project) {
                    setProjects(p => [...p, project]);
                    projectTitle.current.value = '';
                    projectLink.current.value = '';
                    setAdding(false);
                }
            });
    }

    function addView() {
        if (!user) return;

        return adding
            ? <div className={classes.addInputs}>
                <input className={classes.addInput} ref={projectTitle} placeholder="Title" onKeyDown={submitProject} autoFocus />
                <input className={classes.addInput} ref={projectLink} placeholder="https://example.com" onKeyDown={submitProject} />
                <div className={classes.buttons}>
                    <button className={`${classes.addSubmit} adminBtn`} onClick={addProject}>
                        <Icon path={mdiCheck} />
                    </button>
                    <button className={`${classes.addCancel} adminBtn cancel`} onClick={() => setAdding(false)}>
                        <Icon path={mdiClose} />
                    </button>
                </div>
            </div>
            : <button className={`${classes.add} adminBtn`} onClick={() => setAdding(true)}>
                <Icon path={mdiPlus} />
            </button>
    }

    useEffect(() => {
        if (projects == null) getProjects();
    }, [projects, getProjects]);

    return (
        <div className={classes.projects}>
            <h1 className={classes.header}>
                Projects
            </h1>

            {!projects?.length && <Icon className={classes.loading} path={mdiLoading} spin={1} />}

            {projects?.map(project => <Project project={project} setProjects={setProjects} key={project.id} />)}

            { addView() }
        </div>
    );
}
