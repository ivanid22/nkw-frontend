import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignInView from './containers/SignInView/SignInView';
import RouteNotFoundView from './components/RouteNotFoundView/RouteNotFoundView';
import SignUpView from './containers/SignUpView/SignUpView';
import PostingsView from './containers/PostingsView/PostingsView';
import SubmitPostingView from './containers/SubmitPostingView/SubmitPostingView';

function App() {
  return (
    <div className="App" id="appContainer">
      <Router>
        <Switch>
          <Route exact path="/sign_in">
            <SignInView />
          </Route>
          <Route exact path="/sign_up">
            <SignUpView />
          </Route>
          <Route exact path="/postings/create">
            <SubmitPostingView />
          </Route>
          <Route exact path="/postings">
            <PostingsView />
          </Route>
          <Route exact path="/">
            <PostingsView />
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
