import { mdiPen, mdiClose, mdiCheck, mdiTrashCan } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function HeroHeaderBig({ field, saveField, deleteField }) {
    const styles = createUseStyles({
        header: {
            textShadow: '0 0 8px black',
            justifyContent: 'center',
            fontFamily: 'Nunito',
            alignItems: 'center',
            textAlign: 'center',
            letterSpacing: 1,
            fontSize: '3rem',
            fontWeight: 500,
            display: 'flex',
            color: 'white',
        },
        buttons: {
            display: 'flex',
            marginLeft: 20,
        },
        edit: {
            
        },
        save: {
            
        },
        cancel: {
            marginLeft: 10,
        },
        delete: {
            marginLeft: 20,
        },
        input: {
            '&.hidden': {
                display: 'none',
            }
        },
    });
    const classes = styles();

    const [edit, setEdit] = useState(false);
    const input = useRef();

    const user = sessionStorage.getItem('user');

    function saveOnEnter(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            console.log(input.current.innerHTML);
            saveField(input.current.innerHTML, setEdit);
            e.preventDefault();
        }
    }

    return (
        <h1 className={classes.header}>
            {
                user &&
                    <div
                        className={`${classes.input} ${!edit ? 'hidden' : ''}`} ref={input}
                        onKeyDown={saveOnEnter} contentEditable suppressContentEditableWarning
                    >
                        <span dangerouslySetInnerHTML={{ __html: field?.content }} />
                    </div>
            }
            {!edit && <span dangerouslySetInnerHTML={{ __html: field?.content }} />}
            <div className={classes.buttons}>
                {
                    !edit && user &&
                        <button className={`${classes.edit} adminBtn`} onClick={() => setEdit(true)}>
                            <Icon className={classes.editIcon} path={mdiPen} />
                        </button>
                }
                {
                    edit && user &&
                        <>
                            <button className={`${classes.save} adminBtn save`} onClick={() => saveField(input.current.innerHTML, setEdit)}>
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
        </h1>
    );
}
