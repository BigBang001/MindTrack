import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserSettings from './pages/UserSettings';
import SurveyForm from './components/SurveyForm';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/settings">
            <UserSettings />
          </Route>
          <Route path="/survey">
            <SurveyForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
