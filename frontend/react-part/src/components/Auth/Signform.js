import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../services/serverService';

const validEmailRegex = RegExp(
  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
);

const validPasswordRegex = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
);

const validAgeRegex = RegExp(
  /^[0-9]{1,2}[:.,-]?$/
);

const validNameRegex = RegExp(
  /^[a-zA-Z ]*$/
);


class Form extends Component{


    state = {  name: "Name",
     email: "Email",
     age: 19,
     password : "Password",
     confirm_password : "Confirm password",
     emailError: "fine",
     ageError: "fine",
     passwordError : "fine",
     confirmError:"fine",
     nameError:"fine",
     redirect: null
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

validconfirm=()=>{

  if(this.state.password!=this.state.confirm_password){
    this.setState({confirmError:"passwords do not match"})
  }

  else{
    return true
  }

}

validpassword=()=>{

  if(!validPasswordRegex.test(this.state.password)){
    this.setState({passwordError:"Invalid password"})
  }

  else{
    return true
  }

}

validname=()=>{

  if(!validNameRegex.test(this.state.name)){
    this.setState({nameError:"Invalid name"})
  }

  else{
    return true
  }

}

validage=()=>{

  if(!validAgeRegex.test(this.state.age)){
    this.setState({ageError:"Invalid age"})
  }

  else{
    return true
  }

}

emailclean=()=>{
  this.setState({emailError:"fine"})
}

passwordclean=()=>{
  this.setState({passwordError:"fine"})
}

nameclean=()=>{
  this.setState({nameError:"fine"})
}

ageclean=()=>{
  this.setState({ageError:"fine"})
}

confirmclean=()=>{
  this.setState({confirmError:"fine"})
}

handlesubmit = (event) => {
  
  // if(this.valid()){

    // if(this.validname() && this.validage() && this.validemail() && this.validpassword() && this.validconfirm()){
    const data={
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      age: this.state.age,
      confirm_password: this.state.confirm_password
    }

  //  console.log( JSON.stringify(this.state));                 
  event.preventDefault();

  console.log(data);

// axios.post('https://776d58591d10.ngrok.io/auth/register/', data)
ServerService.signup(data)
.then((resp)=>{
  console.log(resp)

  if (resp.data.message === "otp_sent") {
    localStorage.setItem('email', this.state.email)
    this.setState({ redirect: "/otp" });
  }

})




// }
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
   <h1 className={classes.headline}>SIGN-UP</h1>
    <label className={classes.labelfield}> Name </label>< br/>
    <input  type="text" name="name" className={classes.field} required placeholder={this.state.name}  
    onChange={this.handlechangeall} onBlur={this.validname} onFocus={this.nameclean}/> <br/>
    <p className={(this.state.nameError==="fine")? classes.invisible: classes.visible}>{this.state.nameError}</p>
   
    {/* <label className={classes.labelfield}> Age </label><br />
    <input  type="number" name="age" className={classes.field} required placeholder={this.state.age}  
    onChange={this.handlechangeall} onBlur={this.validage} onFocus={this.ageclean}/> <br/>
    <p className={(this.state.ageError==="fine")? classes.invisible: classes.visible}>{this.state.ageError}</p> */}

    <label className={classes.labelfield}> Email </label><br />
    <input  type="email" name="email" className={classes.field} required placeholder= {this.state.email} 
    onChange={this.handlechangeall} onBlur={this.validemail} onFocus={this.emailclean}/> <br/>
    <p  className={(this.state.emailError==="fine")? classes.invisible: classes.visible}>{this.state.emailError}</p>

    <label className={classes.labelfield}> Password </label><br />
    <input  type="password" name="password" className={classes.field} required placeholder= {this.state.password} 
    onChange={this.handlechangeall} onBlur={this.validpassword} onFocus={this.passwordclean}/> <br/>
    <p className={(this.state.passwordError==="fine")? classes.invisible: classes.visible}>{this.state.passwordError}</p>

    <label className={classes.labelfield}> Confirm Password </label><br />
    <input  type="password" name="confirm_password" className={classes.field} required placeholder= {this.state.confirm_password} 
    onChange={this.handlechangeall}  onBlur={this.validconfirm} onFocus={this.confirmclean}/> <br/>
    <p className={(this.state.confirmError==="fine")? classes.invisible: classes.visible}>{this.state.confirmError}</p>


    <input type="submit" value="Submit" 
    className= {classes.sub}
    /><br/>
    {/* <p ><Link to='/sign-in'>click to login </Link></p> */}
    {/* <div className={classes.wraplinks}> */}
    <div className={classes.resign}><Link to='/sign-in' className={classes.linkswitch1}>Already a user? Sign In</Link></div>
    {/* <span className={classes.linkwrap}><Link to='/sign-up' className={classes.linkswitch2}>Sign up </Link></span> */}
    {/* </div> */}
   </form>
   </div>
  </div>
 )
}

}

export default Form;