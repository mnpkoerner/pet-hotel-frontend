import logo from './logo.svg';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard'
import ManageOwners from './components/ManageOwners'

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Pet Hotel</h1>
          <Link to="/dashboard">
            Dashboard
          </Link>
          {' '}
          <Link to="/owners">
            Manage Owners
          </Link>
        </header>

        <Route
          exact
          path="/dashboard"
        >
          <Dashboard/>
        </Route>

        <Route
          exact
          path="/owners"
        >
          <ManageOwners/>
        </Route>
      </div>
    </Router>
  );
}

export default App;
