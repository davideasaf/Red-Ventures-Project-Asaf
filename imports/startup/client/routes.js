import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, DefaultRoute} from 'react-router';

import App from '../../ui/App.jsx';
import Dashboard from '../../ui/Dashboard/Dashboard.jsx';
import Users from '../../ui/Users/Users.jsx';
import Widgets from '../../ui/Widgets/Widgets.jsx';




export const renderRoutes = () => (
<Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRedirect to="dashboard"/>
    <Route path="dashboard" component={Dashboard}/>
    <Route path="users" component={Users}/>
    <Route path="widgets" component={Widgets}/>
  </Route>
</Router>
);