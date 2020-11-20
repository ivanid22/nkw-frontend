import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignInView from './containers/SignInView/SignInView';
import RouteNotFoundView from './components/RouteNotFoundView/RouteNotFoundView';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/auth/sign_in">
            <SignInView />
          </Route>
          <Route exact path="/">
            <RouteNotFoundView />
          </Route>
          <Route>
            <RouteNotFoundView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
