async function getField(field, setField) {
    await fetch(`/api/fields/${field}`, )
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(field => setField(field));
}

async function authenticate(setUser) {
    await fetch('/api/authenticate')
        .then(response => response.json())
        .then(user => setUser(user));
}

export {
    getField,
    authenticate,
}