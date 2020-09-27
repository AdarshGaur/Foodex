import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Home from './components/Navbar/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/Navbar/pages/Services';
import Products from './components/Navbar/pages/Products';
import LogIn from './components/Navbar/pages/LogIn';
import SignUp from './components/Navbar/pages/SignUp';
import Marketing from './components/Navbar/pages/Marketing';
import Otp from './components/Navbar/pages/Otp';
import Design from './components/Navbar/pages/Design';



function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/services' component={Services} />
        <Route path='/products' component={Products} />
        {/* <Route path='/contact-us' component={ContactUs} /> */}
        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-in' component={LogIn} />
        <Route path='/marketing' component={Marketing} />
        <Route path='/otp' component={Otp} />
        <Route path='/design' component={Design} />

      </Switch>
    </Router>
    
  );
}

export default App;
