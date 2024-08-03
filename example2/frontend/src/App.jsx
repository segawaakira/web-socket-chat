import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={Login}
      />
      <Route
        exact
        path="/home"
        component={Home}
      />
      <Route
        exact
        path="/signup"
        component={Signup}
      />
    </Switch>
  );
}

export default App;
