import React, { useState, useEffect, useRef } from 'react';
import Input from './components/Input';
import NavBar from './components/NavBar';
import Clock from './components/Clock';
import Weeks from './components/Weeks';
import Weather from './components/Weather';
import moment from 'moment';
import { Route, Switch, useHistory } from 'react-router-dom';
import Month from './components/Month';
import './App.css';

function App() {
  const [now, setNow] = useState(moment());
  const history = useHistory();
  const today = useRef();

  useEffect(() => {
    today.current.focus();
    setNow(moment());
  }, []);

  return (
    <>
      <NavBar history={history} today={today} setNow={setNow} />
      <Switch>
        <Route path="/todo/month">
          <Month history={history} setNow={setNow} />
        </Route>
        <Route path="/:id">
          <Weeks now={now} setNow={setNow} />
          <Clock now={now} />
          <Input now={now.format('YYYY-MM-DD')} />
        </Route>
      </Switch>
      <Weather />
    </>
  );
}

export default App;
