import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { getField } from '../functions';

export default function Field({ Render, fieldName }) {
    const [field, setField] = useState();

    async function save(input, setEdit) {
        if (field.content === input) return setEdit(false);

        const args = {
            method: 'PUT',
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
            });
    }

    async function deleteField(setEdit) {
        if (!confirm('Delete this field?')) return;

        await fetch(`/api/fields/${field.id ?? 0}`, { method: 'DELETE' })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(content => {
                if (content) {
                    setField(false);
                    setEdit(false);
                }
            });
    }

    useEffect(() => {
        if (field == null) getField(fieldName, setField);
    }, [field, setField, getField]);

    return <Render field={field} saveField={save} deleteField={deleteField} />;
}