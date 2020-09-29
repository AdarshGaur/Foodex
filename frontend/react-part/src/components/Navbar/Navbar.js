import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';


class NavigationBar extends Component{

  render() {

    let token= localStorage.getItem('refresh_token');
      let auth= true;
      if(token===null){
      auth=false;
      }

      const logoutHandler=()=>{
        localStorage.clear();
        auth= false;
      }

      if(auth){
        return(
          <Navbar bg="light" expand="lg" sticky="top">
            <Link className={classes.brand} to="/">Foodex</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Form inline className="ml-auto"> 
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-dark" >Search</Button>
              </Form>
              <Nav className="ml-auto">
                <NavDropdown title="Categories" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/starters">Starters</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/main-course">Main Course</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/deserts">Deserts</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/drinks-smoothies">Drinks and Smoothies</NavDropdown.Item>
          
                </NavDropdown>
                <Nav.Link as={Link} to="/">My Profile</Nav.Link>
                <Nav.Link as={Link} to="/" onClick={logoutHandler}>Logout</Nav.Link>
              </Nav>
              
            </Navbar.Collapse>
          </Navbar>
                );
        
      }


      else{
      return(
<Navbar bg="light" expand="lg" sticky="top">
  <Link className={classes.brand} to="/">Foodex</Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Form inline className="ml-auto"> 
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-dark" >Search</Button>
    </Form>
    <Nav className="ml-auto">
      <NavDropdown title="Categories" id="basic-nav-dropdown">
      <NavDropdown.Item as={Link} to="/starters">Starters</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/main-course">Main Course</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/deserts">Deserts</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/drinks-smoothies">Drinks and Smoothies</NavDropdown.Item>

      </NavDropdown>
      <Nav.Link as={Link} to="/sign-in">Sign In</Nav.Link>
      <Nav.Link as={Link} to="/sign-up">Sign Up</Nav.Link>
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
      );
}




  }
}






export default NavigationBar;
