import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './components/Navbar/pages/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './components/Navbar/pages/LogIn';
import SignUp from './components/Navbar/pages/SignUp';
import Otp from './components/Navbar/pages/Otp';
import Design from './components/Navbar/pages/Design';
import Profile from './components/Profile/Profile'
import AddRecipe from './components/Blogposts/AddRecipe/AddRecipe'



function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />

        {/* <Route path='/contact-us' component={ContactUs} /> */}
        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-in' component={LogIn} />
        <Route path='/profile' component={Profile} />
        <Route path='/otp' component={Otp} />
        <Route path='/design' component={Design} />
        <Route path='/add-recipe' component={AddRecipe} />

      </Switch>
    </Router>
    
  );
}

export default App;
