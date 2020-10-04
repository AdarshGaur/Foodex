import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../services/serverService'


const validEmailRegex = RegExp(
  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
);

class Forgotform extends Component{
  
  state = { 
    email: "Email",
    emailError: "fine",

  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}

validemail=()=>{

  if(!validEmailRegex.test(this.state.email)){
    this.setState({emailError:"Invalid email"})
  }

  else{
    return true
  }
 
}

emailclean=()=>{
  this.setState({emailError:"fine"})
}

handlesubmit = (event) => {
const data={
  email: this.state.email,

}
  event.preventDefault();

console.log(data)

ServerService.forgotform(data)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 200) {

      localStorage.setItem("resetmail",this.state.email)
      this.setState({ redirect: "/forgot-otp" });
    }
  
  })



}

render(){

  if(this.state.redirect){
    return <Redirect to= {this.state.redirect} />
  }

 return(
  <div className={classes.signup}>
    <div className={classes.imgbox}>

    </div>
    <div className={classes.formup}>
   <form onSubmit = {this.handlesubmit} >
   <h1 className={classes.headline}>Enter Your Email</h1>
   <label className={classes.labelfield}> Email </label><br />
    <input  type="email" name="email" className={classes.field} required placeholder= {this.state.email} 
    onChange={this.handlechangeall} onBlur={this.validemail} onFocus={this.emailclean}/> <br/>
    <p  className={(this.state.emailError==="fine")? classes.invisible: classes.visible}>{this.state.emailError}</p>

    <input type="submit" value="Submit" className={classes.sub} />
   </form>
   </div>
  </div>
 )
}

}

export default Forgotform;