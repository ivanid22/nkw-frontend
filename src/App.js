import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/auth/sign_in">
            <SignInView />
          </Route>
          <Route exact path="/auth/sign_up">
            <SignUpView />
          </Route>
          <Route exact path="/">
            <PostingsIndexView />
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
