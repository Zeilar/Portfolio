import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { authenticate } from '../functions';
import React, { useEffect } from 'react';
import NotFound from './NotFound';
import Index from './Index';
import Menu from './Menu';

export default function App() {
    useEffect(() => {
        if (sessionStorage.getItem('user') == null) authenticate();
    }, [authenticate]);

    return (
        <Router>
            <Menu />
            <Switch>
                <Route path="/" exact component={Index} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}