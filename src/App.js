import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// pages
import TopPage from './pages/topPage';
import SignUpPage from './pages/signUpPage';
import LoginPage from './pages/loginPage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={TopPage}></Route>
        <Route exact path="/signUp" component={SignUpPage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
      </Router>
    </div>
  );
}

export default App;
