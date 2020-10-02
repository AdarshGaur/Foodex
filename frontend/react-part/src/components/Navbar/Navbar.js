import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classes from './Navbar.module.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';


class NavigationBar extends Component{

  state = { 
    search:"",
    redirect:null 
  }

  handlechangeall = (event) =>{
    this.setState ( { [event.target.name] :event.target.value  } )
  }

  handlesubmit=(event)=>{

    const data={
      search: this.state.search,

    }
    event.preventDefault();
    this.setState({ redirect: "/search-page" });
   
    // axios.post('https://b841ca4ed474.ngrok.io/search/',data)
    // ServerService.searchbox(data)
    // .then((resp)=>{
      // console.log(resp.data);
      // const search_res=resp.data
      // console.log(search_res);
      // if (resp.status === 200) {
        // localStorage.setItem("token", "abcd");
        // localStorage.setItem("search_result",resp.data)
        // localStorage.setItem("access_token",resp.data.access)
        
    //   }
    
    // })
  
  
  }
  

  //   axios.post('https://60bb5774f441.ngrok.io/search/',data)
  //   .then((resp)=>{
  //     console.log(resp)
  // }}




  render() {

    if(this.state.redirect){
      return <Redirect to= {{
        pathname:this.state.redirect,
        state:{searchterm: this.state.search}
      }} />
    }

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
                <FormControl type="text" name="search" onChange={this.handlechangeall} placeholder="Search" className={classes.sbar}
                // "mr-sm-2"
                />
                <Button onClick={this.handlesubmit} className={classes.sbtn} variant="outline-dark" ><i class="fa fa-search" aria-hidden="true"></i></Button>
              </Form>
              <Nav className="ml-auto" >
                <NavDropdown title="Categories" className={classes.navoption} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} className={classes.dditems} to="/starters">Starters</NavDropdown.Item>
                  <NavDropdown.Item as={Link} className={classes.dditems} to="/main-course">Main Course</NavDropdown.Item>
                  <NavDropdown.Item as={Link} className={classes.dditems} to="/deserts">Deserts</NavDropdown.Item>
                  <NavDropdown.Item as={Link} className={classes.dditems} to="/drinks-smoothies">Drinks and Smoothies</NavDropdown.Item>
          
                </NavDropdown>
                <Nav.Link as={Link} className={classes.navoption} to="/add-recipe">Post</Nav.Link>
                <Nav.Link as={Link} className={classes.navoption} to="/profile">My Profile</Nav.Link>
                <Nav.Link as={Link} className={classes.navoption} to="/" onClick={logoutHandler}>Logout</Nav.Link>
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
                <FormControl type="text" name="search" onChange={this.handlechangeall} placeholder="Search" className={classes.sbar}
                // "mr-sm-2"
                />
                <Button onClick={this.handlesubmit} className={classes.sbtn} variant="outline-dark" ><i class="fa fa-search" aria-hidden="true"></i></Button>
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
