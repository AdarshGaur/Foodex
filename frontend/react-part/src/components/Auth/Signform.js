import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link, Redirect} from 'react-router-dom';

class Form extends Component{


    state = {  name: "Name",
     email: "Email",
     age: "Age",
     password : "Password",
     confirm_password : "Confirm password",
     emailError: "",
     passwordError : "",
     redirect: null
  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}

// handlesubmit = (event) => {
//  alert (`my name is ${this.state.fullname}. 
//   My email id is ${this.state.email}
//   My mobile number is ${this.state.phone}.
//   `);

//  console.log( JSON.stringify(this.state));
//  event.preventDefault();
// }

valid(){

  if(!this.state.email.includes(".") && this.state.password.length<6 && this.state.password!=this.state.confirm_password){
    this.setState({emailError:"Invalid email", passwordError:"password should be atleast 6 characters long",
    confirmError:"passwords do not match"
  })
  }

  else if(this.state.password!=this.state.confirm_password){
    this.setState({confirmError:"passwords do not match"})
  }

  else if(!this.state.email.includes("."))
  {
    this.setState({emailError:"Invalid email"})
  }
  else if(this.state.password.length<6){
    this.setState({passwordError:"password should be atleast 6 characters long"})
  }
  else{
    return true
  }
}



handlesubmit = (event) => {
  
  if(this.valid()){
   console.log( JSON.stringify(this.state));                 
  event.preventDefault();
 fetch('https://4e4d247fada6.ngrok.io/auth/register/',{
   method: "POST",
   body:JSON.stringify(this.state),
   headers: {
    //  "Accept": "application.json",
     "Content-Type": "application/json"
   }
   
 }).then((result)=>{
   result.json().then((resp)=>{
     console.log(resp.message)
       if(resp.message==="otp_sent"){
         localStorage.setItem('email', this.state.email)
     this.setState({redirect:"/otp"});
       }
      //  else{
      //    console.alert("user exists already")
      //  }
   }).catch(error=>console.error('error:', error))
   .then(resp=>console.log('Success:',resp));

 })
}
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
    {/* <label> Full Name </label><br/> */}
    <input  type="text" name="name" className={classes.fields} required placeholder={this.state.name}  
    onChange={this.handlechangeall} /> <br/>
   
    {/* <label> Age </label><br/> */}
    <input  type="number" name="age" className={classes.fields} required placeholder={this.state.age}  
    onChange={this.handlechangeall} /> <br/>

    {/* <label> Email </label><br/> */}
    <input  type="email" name="email" required placeholder= {this.state.email} 
    onChange={this.handlechangeall} /> <br/>
    <p>{this.state.emailError}</p>

    {/* <label> Password </label><br/> */}
    <input  type="password" name="password" required placeholder= {this.state.password} 
    onChange={this.handlechangeall} /> <br/>
    <p>{this.state.passwordError}</p>

    <input  type="password" name="confirm_password" required placeholder= {this.state.confirm_password} 
    onChange={this.handlechangeall} /> <br/>
    <p>{this.state.confirmError}</p>

    <input type="submit" value="Submit" />
    <p ><Link to='/sign-in'>click to login </Link></p>
   </form>
   </div>
  </div>
 )
}

}

export default Form;