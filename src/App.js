import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// pages
import TopPage from './pages/topPage';
import SignUpPage from './pages/signUpPage';
import LoginPage from './pages/loginPage';
import ContentPage from './pages/contentPage';
import PortfolioPage from './pages/portfolioPage';
import ProfilePage from './pages/profilePage';
import AcountEditPage from './pages/acountEditPage';
import PoolingPage from './pages/poolingPage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={TopPage}></Route>
          <Route exact path="/home" component={TopPage}></Route>
          <Route exact path="/home:seachKey" component={TopPage}></Route>
          <Route exact path="/signUp" component={SignUpPage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/content:imageName" component={ContentPage}></Route>
          <Route exact path="/portfolio:userId" component={PortfolioPage}></Route>
          <Route exact path="/profile:userId" component={ProfilePage}></Route>
          <Route exact path="/acountEdit:userId" component={AcountEditPage}></Route>
          <Route exact path="/pooling" component={PoolingPage}></Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
