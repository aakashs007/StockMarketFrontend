import React from 'react';
import { Router, Route } from 'react-router';
import Main from '../../components/main';
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

const App = (props) => {
  return (
    <Router history={customHistory}>
      <Route path="/" component={Main} />
    </Router>
  );
}

export default App;
