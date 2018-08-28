import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './hoc/layout';
import Home from './components/Home/home';
import Reteta from './components/Reteta/reteta';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/reteta/:id" exact component={Reteta} />
                <Redirect to="/" />
            </Switch>
        </Layout>
    );
};

export default Routes;