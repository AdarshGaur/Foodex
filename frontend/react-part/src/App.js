import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './components/Navbar/pages/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './components/Navbar/pages/LogIn';
import SignUp from './components/Navbar/pages/SignUp';
import Otp from './components/Navbar/pages/Otp';
import Profile from './components/Profile/Profile'
import AddRecipe from './components/Blogposts/AddRecipe/AddRecipe'
import ReadRecipe from './components/Blogposts/ReadRecipe/ReadRecipe'



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
        <Route path='/add-recipe' component={AddRecipe} />
        <Route path='/read-recipe' component={ReadRecipe} />

      </Switch>
    </Router>
    
  );
}

export default App;
