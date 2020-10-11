async function getField(field, setField) {
    await fetch(`/api/fields/${field}`, )
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(field => setField(field));
}

async function authenticate() {
    await fetch('/api/authenticate')
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(user => {
            try {
                user = JSON.parse(user);
            } catch (e) {
                user = false;
            }
            if (user) {
                sessionStorage.setItem('user', user);
            }
        });
}

export {
    authenticate,
    getField,
}