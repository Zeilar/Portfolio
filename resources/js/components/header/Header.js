import React, { useState, useEffect, useRef } from 'react';
import { getField, authenticate } from '../../functions';
import { mdiCheck, mdiClose, mdiPen } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function Header() {
    const styles = createUseStyles({
        header: {
            backgroundImage: 'url("./storage/images/hero.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            display: 'flex',
            height: '100vh',
            '@media (max-width: 1200px)': {
                
            },
            '@media (max-width: 768px)': {
                
            },
        },
        hero: {
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            width: '100%',
        },
        headerBig: {
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
        headerSmall: {

        },
        headerBigEdit: {
            marginLeft: 10,
            height: '2rem',
            width: '2rem',
            padding: 5,
        },
        headerBigSave: {
            marginLeft: 10,
        },
        headerBigCancel: {
            marginLeft: 10,
        },
        headerBigInput: {

        },
    });
    const classes = styles();

    // Edit states
    const [headerButtonEdit, setHeaderButtonEdit] = useState(false);
    const [headerSmallEdit, setHeaderSmallEdit] = useState(false);
    const [headerBigEdit, setHeaderBigEdit] = useState(false);

    // Content states
    const [headerSmall, setHeaderSmall] = useState();
    const [headerBig, setHeaderBig] = useState();
    const [button, setButton] = useState();
    const [user, setUser] = useState();

    const headerBigInput = useRef();

    async function headerBigSave() {
        await fetch(`/api/fields/${headerBig.id}`, { method: 'PATCH', body: headerBigInput.current.value })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(content => {
                setHeaderBigEdit(false);
                setHeaderBig(content);
            });
    }

    useEffect(() => {
        if (headerSmall == null) getField('heroHeaderSmall', setHeaderSmall);
        if (headerBig == null) getField('heroHeaderBig', setHeaderBig);
        if (button == null) getField('heroButton', setButton);
        if (user == null) authenticate(setUser);
    }, [button, setButton, user, setUser, authenticate, headerBig, setHeaderBig, headerSmall, setHeaderSmall]);

    return (
        <header className={classes.header}> 
            <div className={classes.hero}>
                <h1 className={classes.headerBig}>
                    {
                        headerBigEdit
                            ? <input className={classes.headerBigInput} type="text" defaultValue={headerBig?.content} ref={headerBigInput} />
                            : headerBig?.content
                    }
                    {
                        user && !headerBigEdit &&
                            <button className={`${classes.headerBigEdit} btn`} onClick={() => setHeaderBigEdit(true)}>
                                <Icon className={classes.editIcon} path={mdiPen} />
                            </button>
                    }
                    {
                        headerBigEdit &&
                            <>
                                <button className={`${classes.headerBigSave} btn save`} onClick={headerBigSave}>
                                    <Icon path={mdiCheck} />
                                </button>
                                <button className={`${classes.headerBigCancel} btn cancel`} onClick={() => setHeaderBigEdit(false)}>
                                    <Icon path={mdiClose} />
                                </button>
                            </>
                    }
                </h1>
                <h2 className={classes.headerSmall}>
                    {headerSmall}
                </h2>
            </div>
        </header>
    );
}
