import React, { useState, useEffect } from 'react';
import { getField } from '../functions';

export default function Field({ render: Render, fieldName, props }) {
    const [field, setField] = useState();

    async function save(input, setEdit) {
        if (field.content === input) return setEdit(false);

        const args = {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': document.querySelector('[name=_token]').getAttribute('content'),
            },
            body: JSON.stringify({
                name: field.name ?? fieldName,
                content: input,
            })
        };

        await fetch(`/api/fields/${field.id ?? 0}`, args)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(content => {
                if (content) {
                    setField(content);
                    setEdit(false);
                }
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        if (field == null) getField(fieldName, setField);
    }, [field, setField, getField]);

    return <Render {...props} field={field} saveField={save} />;
}