import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Redirect} from 'react-router-dom';

class Otpform extends Component{

  // newmail=localStorage.getItem('email')
  
    state = {   email: localStorage.getItem('email'),
      otp: "otp",
      redirect: null
  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}








// valid(){



//   if(!this.state.email.includes(".") && this.state.password.length<6 ){
//     this.setState({emailError:"Invalid email", passwordError:"password should be atleast 6 characters long",
//     confirmError:"passwords do not match"
//   })
//   }

//   else if(!this.state.email.includes("."))
//   {
//     this.setState({emailError:"Invalid email"})
//   }
//   else if(this.state.password.length<6){
//     this.setState({passwordError:"password should be atleast 6 characters long"})
//   }
//   else{
//     return true
//   }
// }



// handlesubmit = (event) => {
  
//   // console.log(newmail)
//   // this.setState({ email: newmail });

//   console.log( JSON.stringify(this.state));
//   event.preventDefault();
//  fetch('https://58b27cd52c01.ngrok.io/register/otp/',{
//    method: "POST",
//    headers: {
//     //  "Accept": "application.json",
//      "Content-Type": "application/json"
//    },
//    body:JSON.stringify(this.state)
//  }).then((result)=>{
//    result.json().then((resp)=>{
//      console.log(resp)
//    })
//  })
 
//  }



handlesubmit = (event) => {
  
  // if(this.valid()){
   console.log( JSON.stringify(this.state));                 
  event.preventDefault();
 fetch('https://8ca171214697.ngrok.io/auth/register/otp/',{
   method: "POST",
   body:JSON.stringify(this.state),
   headers: {
    //  "Accept": "application.json",
     "Content-Type": "application/json"
   }
   
 }).then((result)=>{
   result.json().then((resp)=>{
     console.log(resp.access)
    //    if(resp.message==="email_verified"){
    //  this.setState({redirect:"/"});
    //    }
    if(resp.access){
      localStorage.setItem("refresh_token",JSON.stringify(resp.refresh))
    localStorage.setItem("access_token",JSON.stringify(resp.access))
    this.setState({redirect:"/"});
    }

   }).catch(error=>console.error('error:', error))
   .then(resp=>console.log('Success:',resp));

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
   <h1 className={classes.headline}>Enter OTP</h1>
    {/* <label> Full Name </label><br/> */}
    <input  type="text" name="otp"  placeholder={this.state.otp}  
    onChange={this.handlechangeall} /> <br/>

    <input type="submit" value="Submit" />
    {/* <p ><Link to='/otp'>click to login </Link></p> */}
   </form>
   </div>
  </div>
 )
}

}

export default Otpform;