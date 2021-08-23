import React, { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import moment from 'moment';

import Input from './components/Input';
import NavBar from './components/NavBar';
import Clock from './components/Clock';
import Weeks from './components/Weeks';
import Weather from './components/Weather';
import Month from './components/Month';
import './App.css';

function App() {
  const [now, setNow] = useState(moment());
  const history = useHistory();

  return (
    <>
      <NavBar history={history} setNow={setNow} />
      <Switch>
        <Route exact path="/todo">
          <Redirect to="/todo/today" />
        </Route>
        <Route path="/todo/today">
          <Weeks now={now} setNow={setNow} />
          <Clock now={now} />
          <Input now={now.format('YYYY-MM-DD')} />
        </Route>
        <Route path="/todo/month">
          <Month history={history} setNow={setNow} />
        </Route>
      </Switch>
      <Weather />
    </>
  );
}

export default App;
