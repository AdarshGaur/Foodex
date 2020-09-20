import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Home from './components/Navbar/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/Navbar/pages/Services';
import Products from './components/Navbar/pages/Products';
import ContactUs from './components/Navbar/pages/ContactUs';
import SignUp from './components/Navbar/pages/SignUp';
import Marketing from './components/Navbar/pages/Marketing';
import Consulting from './components/Navbar/pages/Consulting';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/services' component={Services} />
        <Route path='/products' component={Products} />
        <Route path='/contact-us' component={ContactUs} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/marketing' component={Marketing} />
        <Route path='/consulting' component={Consulting} />
      </Switch>
    </Router>
  );
}

export default App;
