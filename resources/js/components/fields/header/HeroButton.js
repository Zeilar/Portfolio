import { mdiPen, mdiClose, mdiCheck, mdiTrashCan } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import { getField } from '../../../functions';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function HeroButton({ field, saveField, deleteField }) {
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

    return (
        <div className={classes.wrapper}>
            {
                edit && user && 
                    <input 
                        className={classes.input} defaultValue={field?.content} ref={input}
                        onKeyDown={(e) => e.key === 'Enter' && saveField(input.current.value, setEdit)}
                    />
            }
            {!edit && field?.content}
            {
                !edit && user &&
                    <button className={`${classes.edit} btn`} onClick={() => setEdit(true)}>
                        <Icon className={classes.editIcon} path={mdiPen} />
                    </button>
            }
            {
                edit && user &&
                    <>
                        <button className={`${classes.save} btn save`} onClick={() => saveField(input.current.value, setEdit)}>
                            <Icon path={mdiCheck} />
                        </button>
                        <button className={`${classes.cancel} btn cancel`} onClick={() => setEdit(false)}>
                            <Icon path={mdiClose} />
                        </button>
                    </>
            }
            {
                field && user &&
                    <button className={`${classes.delete} btn delete`} onClick={() => deleteField(setEdit)}>
                        <Icon path={mdiTrashCan} />
                    </button>
            }
        </div>
    );
}
