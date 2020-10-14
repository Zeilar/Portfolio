import React, { useState, useRef, useEffect } from 'react';
import { mdiPen, mdiClose, mdiCheck } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function HeroText({ field, saveField, setTextLoaded }) {
    const styles = createUseStyles({
        field: {
            textShadow: '0 0 2px black',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Inter',
            textAlign: 'center',
            padding: [0, 15],
            lineHeight: 1.5,
            fontWeight: 500,
            display: 'flex',
            marginTop: 30,
            maxWidth: 800,
            '&.animation': {
                animation: '$fadeIn 0.75s ease-out forwards',
            },
            '@media (max-width: 768px)': {
                maxWidth: 'unset',
                fontSize: '1rem',
            },
            '@media (max-width: 1200px)': {
                flexDirection: 'column',
            },
        },
        buttons: {
            display: 'flex',
            marginLeft: 40,
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
            
        },
    });
    const classes = styles();

    const [user, setUser] = useState(sessionStorage.getItem('user'));
    const [edit, setEdit] = useState(false);
    const input = useRef();

    function saveOnEnter(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            saveField(input.current.innerHTML, setEdit);
            e.preventDefault();
        }
    }

    useEffect(() => {
        if (field) setTextLoaded(true);
    }, [setTextLoaded, field]);

    return (
        <div className={classes.field}>
            <p className={classes.input} ref={input} onKeyDown={saveOnEnter} contentEditable={edit} suppressContentEditableWarning>
                {field?.content}
            </p>
            {
                field &&
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
                    </div>
            }
        </div>
    );
}
