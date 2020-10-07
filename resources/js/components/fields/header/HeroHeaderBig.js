import React, { useState, useRef, useEffect } from 'react';
import { mdiPen, mdiClose, mdiCheck } from '@mdi/js';
import { getField } from '../../../functions';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function HeroHeaderBig() {
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
        headerEdit: {
            marginLeft: 10,
            height: '2rem',
            width: '2rem',
            padding: 5,
        },
        headerSave: {
            marginLeft: 10,
        },
        headerCancel: {
            marginLeft: 10,
        },
        headerInput: {

        },
    });
    const classes = styles();

    const [edit, setEdit] = useState(false);
    const [header, setHeader] = useState();
    const headerInput = useRef();

    async function save() {
        if (header.content === headerInput.current.value) return setEdit(false);

        await fetch(`/api/fields/${header.id}`, { method: 'PATCH', body: headerInput.current.value })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(content => {
                setHeader(content);
                setEdit(false);
            });
    }

    useEffect(() => {
        if (header == null) getField('heroHeaderBig', setHeader);
    }, [header, setHeader, getField]);

    return (
        <h1 className={classes.header}>
            {
                edit
                    ? <input className={classes.headerInput} type="text" defaultValue={header?.content} ref={headerInput} />
                    : header?.content
            }
            {
                !edit && sessionStorage.getItem('user') &&
                    <button className={`${classes.headerEdit} btn`} onClick={() => setEdit(true)}>
                        <Icon className={classes.editIcon} path={mdiPen} />
                    </button>
            }
            {
                edit &&
                    <>
                        <button className={`${classes.headerSave} btn save`} onClick={save}>
                            <Icon path={mdiCheck} />
                        </button>
                        <button className={`${classes.headerCancel} btn cancel`} onClick={() => setEdit(false)}>
                            <Icon path={mdiClose} />
                        </button>
                    </>
            }
        </h1>
    );
}