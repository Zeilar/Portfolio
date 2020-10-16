import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';

export default function Project({ project, setProjects }) {
    const styles = createUseStyles({
        project: {
            textShadow: '0 0 2px black',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontWeight: 500,
            lineHeight: 1.5,
            display: 'flex',
            marginTop: 10,
        },
        link: {
            position: 'relative',
            color: 'inherit',
            '&::after': {
                backgroundColor: 'var(--color-primary)',
                transform: 'translateX(-50%)',
                transition: 'inherit',
                position: 'absolute',
                content: '""',
                left: '50%',
                bottom: 0,
                height: 2,
                width: 0,
            },
            '&:hover': {
                textDecoration: 'none',
                '&::after': {
                    width: '100%',
                },
            },
        },
        delete: {
            marginLeft: 30,
        },
    });
    const classes = styles();

    const [user, setUser] = useState(sessionStorage.getItem('user'));

    async function deleteProject() {
        if (!confirm('Delete project?')) return;

        const args = {
            method: 'DELETE',
            headers: {
                'X-CSRF-Token': document.querySelector('[name=_token]').getAttribute('content'),
            },
        };

        await fetch(`/api/projects/${project.id}`, args)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(projectId => setProjects(p => p.filter(element => element.id !== projectId)))
            .catch(error => console.log(error));
    }

    return (
        <div className={classes.project}>
            <a className={classes.link} href={project.link} target="_blank">
                {project?.title}
            </a>
            {
                project && user &&
                    <button className={`${classes.delete} adminBtn delete`} onClick={deleteProject}>
                        <Icon path={mdiTrashCan} />
                    </button>
            }
        </div>
    );
}
