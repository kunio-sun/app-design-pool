import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// pages
import TopPage from './pages/topPage';
import SignUpPage from './pages/signUpPage';
import LoginPage from './pages/loginPage';
import ContentPage from './pages/contentPage';
import PortfolioPage from './pages/portfolioPage';
import ProfilePage from './pages/profilePage';
import AcountEdit from './pages/acountEdit';
import PoolingPage from './pages/poolingPage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={TopPage}></Route>
          <Route path="/signUp" component={SignUpPage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/content" component={ContentPage}></Route>
          <Route path="/portfolio" component={PortfolioPage}></Route>
          <Route path="/profile" component={ProfilePage}></Route>
          <Route path="/acountEdit" component={AcountEdit}></Route>
          <Route path="/pooling" component={PoolingPage}></Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
