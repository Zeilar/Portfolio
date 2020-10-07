import { mdiPen, mdiClose, mdiCheck, mdiTrashCan } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import { getField } from '../../../functions';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function HeroHeaderSmall() {
    const styles = createUseStyles({
        header: {
            textShadow: '0 0 8px black',
            textTransform: 'uppercase',
            fontFamily: 'Nunito',
            alignItems: 'center',
            letterSpacing: 1,
            fontSize: '3rem',
            fontWeight: 500,
            display: 'flex',
            color: 'white',
        },
        edit: {
            marginLeft: 10,
            height: '2rem',
            width: '2rem',
            padding: 5,
        },
        save: {
            marginLeft: 10,
        },
        cancel: {
            marginLeft: 10,
        },
        delete: {
            marginLeft: 10,
        },
        input: {
            textAlign: 'center',
        },
    });
    const classes = styles();

    const [edit, setEdit] = useState(false);
    const [header, setHeader] = useState();
    const input = useRef();

    const user = sessionStorage.getItem('user');

    async function save() {
        if (header.content === input.current.value) return setEdit(false);

        const args = {
            method: 'PATCH',
            body: JSON.stringify({
                name: header.name ?? 'heroHeaderSmall',
                content: input.current.value,
            })
        };

        await fetch(`/api/fields/${header.id ?? 0}`, args)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(content => {
                if (content) {
                    setHeader(content);
                    setEdit(false);
                }
            });
    }

    useEffect(() => {
        if (header == null) getField('heroHeaderSmall', setHeader);
    }, [header, setHeader, getField]);

    return (
        <h1 className={classes.header}>
            {edit && user && <input onKeyDown={(e) => e.key === 'Enter' && save()} className={classes.input} defaultValue={header?.content} ref={input} />}
            {!edit && header?.content}
            {
                !edit && user &&
                    <button className={`${classes.edit} btn`} onClick={() => setEdit(true)}>
                        <Icon className={classes.editIcon} path={mdiPen} />
                    </button>
            }
            {
                edit && user &&
                    <>
                        <button className={`${classes.save} btn save`} onClick={save}>
                            <Icon path={mdiCheck} />
                        </button>
                        <button className={`${classes.cancel} btn cancel`} onClick={() => setEdit(false)}>
                            <Icon path={mdiClose} />
                        </button>
                    </>
            }
            {
                user && 
                    <button className={`${classes.delete} btn delete`}>
                        <Icon path={mdiTrashCan} />
                    </button>
            }
        </h1>
    );
}
