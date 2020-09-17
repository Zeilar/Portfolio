import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateProject from './projects/CreateProject';
import Projects from './projects/Projects';
import React, { useState } from 'react';
import NotFound from './NotFound';
import Index from './Index';

export default function App() {
    const [user, setUser] = useState();

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/projects" exact component={Projects} />
                <Route path="/projects/create" component={CreateProject} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}