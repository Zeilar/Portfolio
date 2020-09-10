import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import NotFound from './NotFound';
import Main from './Main';

export default function App() {
    const [user, setUser] = useState();

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={() => <Main user={user} />} />
                <Route component={() => <NotFound user={user} />} />
            </Switch>
        </Router>
    );
}