import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { authenticate } from '../functions';
import Header from './header/Header';
import NotFound from './NotFound';
import Index from './Index';

export default function App() {
    const [user, setUser] = useState(true);

    useEffect(() => {
        if (user == null) authenticate(setUser);
    }, [user, authenticate]);

    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Index} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}