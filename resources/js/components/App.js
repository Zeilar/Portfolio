import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateProject from './projects/CreateProject';
import React, { useState, useEffect } from 'react';
import Projects from './projects/Projects';
import NotFound from './NotFound';
import Header from './Header';
import Index from './Index';

export default function App() {
    const [user, setUser] = useState(true);

    async function authenticate() {
        await fetch('/api/authenticate', { method: 'POST' })
            .then(response => response.json())
            .then(user => setUser(user));
    }

    useEffect(() => {
        if (user == null) authenticate();
    }, [user, setUser]);

    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/projects" exact component={Projects} />
                <Route path="/projects/create" exact component={CreateProject} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}