import React, { useState, useRef, useEffect } from 'react';
import { mdiPen, mdiClose, mdiCheck } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function HeroHeader({ field, saveField, setHeaderLoaded }) {
    const styles = createUseStyles({
        '@keyframes fadeIn': {
            from: {
                transform: 'translateY(-50px)',
                opacity: 0,
            },
            to: {
                transform: 'translateY(0)',
                opacity: 1,
            },
        },
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
            '@media (max-width: 768px)': {
                fontSize: '2rem',
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
            '&.hidden': {
                display: 'none',
            }
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

    function onEdit() {
        setEdit(true);
        input.current.focus();
    }

    useEffect(() => {
        if (field) setHeaderLoaded(true);
    }, [setHeaderLoaded, field]);

    return (
        <h1 className={classes.field}>
            <div className={classes.input} ref={input} onKeyDown={saveOnEnter} contentEditable={edit} suppressContentEditableWarning>
                {field?.content}
            </div>
            {
                field &&
                    <div className={classes.buttons}>
                        {
                            !edit && user &&
                                <button className={`${classes.edit} adminBtn`} onClick={onEdit}>
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
        </h1>
    );
}
