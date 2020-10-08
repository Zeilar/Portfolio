import { mdiPen, mdiClose, mdiCheck, mdiTrashCan } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import { getField } from '../../../functions';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function HeroHeaderBig({ field, saveField, deleteField }) {
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
    const input = useRef();

    const user = sessionStorage.getItem('user');

    function onEdit() {
        setEdit(true);
        console.log(input.current);
    }

    return (
        <h1 className={classes.header}>
            {
                edit && user && 
                    <input 
                        onKeyDown={(e) => e.key === 'Enter' && saveField(input.current.value, setEdit)}
                        className={classes.input} defaultValue={field?.content} ref={input}
                    />
            }
            {!edit && field?.content}
            {
                !edit && user &&
                    <button className={`${classes.edit} adminBtn`} onClick={onEdit}>
                        <Icon className={classes.editIcon} path={mdiPen} />
                    </button>
            }
            {
                edit && user &&
                    <>
                        <button className={`${classes.save} adminBtn save`} onClick={() => saveField(input.current.value, setEdit)}>
                            <Icon path={mdiCheck} />
                        </button>
                        <button className={`${classes.cancel} adminBtn cancel`} onClick={() => setEdit(false)}>
                            <Icon path={mdiClose} />
                        </button>
                    </>
            }
            {
                field && user &&
                    <button className={`${classes.delete} adminBtn delete`} onClick={() => deleteField(setEdit)}>
                        <Icon path={mdiTrashCan} />
                    </button>
            }
        </h1>
    );
}
