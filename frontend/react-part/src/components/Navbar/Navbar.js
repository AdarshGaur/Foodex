import React, { Component } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
// import Dropdown from './Dropdown';

// function Navbar() {
//   const [click, setClick] = useState(false);
//   const [dropdown, setDropdown] = useState(false);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   const onMouseEnter = () => {
//     if (window.innerWidth < 960) {
//       setDropdown(false);
//     } else {
//       setDropdown(true);
//     }
//   };

//   const onMouseLeave = () => {
//     if (window.innerWidth < 960) {
//       setDropdown(false);
//     } else {
//       setDropdown(false);
//     }
//   };

//   return (
//     <>
//       <nav className='navbar'>
//         <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
//           FOODEX
//           {/* enter logo here */}
//           {/* <i class='fab fa-firstdraft' /> */}
//         </Link>
//         <div className='menu-icon' onClick={handleClick}>
//           <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
//         </div>
//         <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//           <li className='nav-item'>
//             <Link to='/' className='nav-links' onClick={closeMobileMenu}>
//               Home
//             </Link>
//           </li>
//           <li
//             className='nav-item'
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//           >
//             <Link
//               to='/services'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Categories <i className='fas fa-caret-down' />
//             </Link>
//             {dropdown && <Dropdown />}
//           </li>
//           <li className='nav-item'>
//             <Link
//               to='/products'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Recipes
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link
//               to='/contact-us'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link
//               to='/sign-up'
//               className='nav-links-mobile'
//               onClick={closeMobileMenu}
//             >
//               Sign Up/Sign In
//             </Link>
//           </li>
//         </ul>
//         <Button />
//       </nav>
//     </>
//   );
// }

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
                  <NavDropdown.Item as={Link} to="/design">Deserts</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/sign-up">Main Course</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/sign-up">Starters</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/sign-up">Shakes and Smoothies</NavDropdown.Item>
          
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
        <NavDropdown.Item as={Link} to="/design">Deserts</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/sign-up">Main Course</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/sign-up">Starters</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/sign-up">Shakes and Smoothies</NavDropdown.Item>

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
