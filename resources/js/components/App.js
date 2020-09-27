import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateProject from './projects/CreateProject';
import React, { useState, useEffect } from 'react';
import Projects from './projects/Projects';
import NotFound from './NotFound';
import Index from './Index';

export default function App() {
    const [projects, setProjects] = useState();
    const [user, setUser] = useState(true);

    async function authenticate() {
        await fetch('/api/authenticate', { method: 'POST' })
            .then(response => response.json())
            .then(user => setUser(user));
    }

    async function getProjects() {
        await fetch('/api/projects')
            .then(response => response.json())
            .then(projects => setProjects(projects));
    }

    useEffect(() => {
        if (user == null) authenticate();
        if (projects == null) getProjects();
    }, [user, projects, getProjects, authenticate]);

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/projects" exact component={() => <Projects projects={projects} />} />
                <Route path="/projects/create" exact component={CreateProject} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}