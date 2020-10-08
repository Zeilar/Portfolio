import { mdiPen, mdiClose, mdiCheck, mdiTrashCan } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import { getField } from '../../../functions';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function HeroButton({ field, saveField, deleteField }) {
    const styles = createUseStyles({
        button: {
            
        },
        wrapper: {
            display: 'flex',
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
            <button className={classes.button}>
                {!edit && field?.content}
            </button>
            {
                edit && user && 
                    <input 
                        className={classes.input} defaultValue={field?.content} ref={input}
                        onKeyDown={(e) => e.key === 'Enter' && saveField(input.current.value, setEdit)}
                    />
            }
            {
                !edit && user &&
                    <button className={`${classes.edit} adminBtn`} onClick={() => setEdit(true)}>
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
        </div>
    );
}
