import "../App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import RegisterForm from "./Register/RegisterForm";
import LoginForm from "./Login/LoginForm";
import HomePage from "./HomePage/HomePage";
function App({ user }) {
  return (
    <div className="App" style={{}}>
      <Switch>
        <Route exact path="/">
          <LoginForm user={user} />
        </Route>
        <Route exact path="/register">
          <RegisterForm user={user} />
        </Route>
        <Route path="/home">
          {user.logged ? <HomePage user={user} /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
  );
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, null)(App);
