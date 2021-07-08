import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Pages/Home/HomeComponent';
import Task from './Pages/Task/TaskComponent';
import NewTaskComponent from './Pages/NewTask/NewTaskComponent';

const Rotas = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/task/:id" exact component={NewTaskComponent} />
            <Route path="/new" exact component={NewTaskComponent} />
        </Switch>
    </BrowserRouter>
)

export default Rotas;