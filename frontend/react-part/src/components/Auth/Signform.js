import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link} from 'react-router-dom';

class Form extends Component{


    state = {  fullname: "rakshit",
     email: "Enter your email ID",
     age: 18,
     password : "password"
  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}

handlesubmit = (event) => {
 alert (`my name is ${this.state.fullname}. 
  My email id is ${this.state.email}
  My mobile number is ${this.state.phone}.
  `);

 console.log( JSON.stringify(this.state));
 event.preventDefault();
}

render(){
 return(
  <div className={classes.signup}>
    <div className={classes.imgbox}>

    </div>
    <div className={classes.formup}>
   <form onSubmit = {this.handlesubmit} >
   <h1 className={classes.headline}>SIGN-UP</h1>
    <label> Full Name </label><br/>
    <input  type="text" name="fullname"  placeholder={this.state.fullname}  
    onChange={this.handlechangeall} /> <br/>
   
    <label> Age </label><br/>
    <input  type="number" name="age"  placeholder={this.state.age}  
    onChange={this.handlechangeall} /> <br/>

    <label> Email </label><br/>
    <input  type="email" name="email" placeholder= {this.state.email} 
    onChange={this.handlechangeall} /> <br/>

    <label> Password </label><br/>
    <input  type="password" name="password" placeholder= {this.state.phone} 
    onChange={this.handlechangeall} /> <br/>

    <input type="submit" value="Submit" />
    <p ><Link to='/sign-in'>click to login </Link></p>
   </form>
   </div>
  </div>
 )
}

}

export default Form;