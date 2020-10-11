import { mdiPen, mdiClose, mdiCheck, mdiTrashCan } from '@mdi/js';
import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function HeroHeader({ field, saveField, deleteField }) {
    const styles = createUseStyles({
        field: {
            textShadow: '0 0 2px black',
            justifyContent: 'center',
            fontFamily: 'Montserrat',
            alignItems: 'center',
            textAlign: 'center',
            letterSpacing: 1,
            fontSize: '3rem',
            display: 'flex',
            '@media (max-width: 1200px)': {
                flexDirection: 'column',
                fontSize: '2.5rem',
            },
        },
        buttons: {
            display: 'flex',
            marginLeft: 20,
            '@media (max-width: 1200px)': {
                marginLeft: 0,
                marginTop: 20,
            },
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
            saveField(input.current.innerHTML, setEdit);
            e.preventDefault();
        }
    }

    return (
        <h1 className={classes.field}>
            <div className={classes.input} ref={input} onKeyDown={saveOnEnter} contentEditable={edit} suppressContentEditableWarning>
                {field?.content}
            </div>
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
