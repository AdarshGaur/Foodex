import React, {Component} from 'react';
import NavigationBar from '../../Navbar/Navbar';
import classes from '../FollowersList/FollowersList.module.css';
import {Link} from 'react-router-dom';
import PersonCard from '../../UI/Card/PersonCard/PersonCard';
import Details from '../Details/Details';
import axios from 'axios';
import serverService from '../../../services/serverService';
import Loader from 'react-loader-spinner'


class FollowingList extends Component {

  state = {
    isLoading: true,
    personcards: [],
    error: null
  }

  componentDidMount(){
   serverService.following()
    .then(response=>{
      console.log(response.data);
      this.setState({personcards: response.data, isLoading: false})
    })
  }


    render(){

      if(this.state.isLoading){
        return  (
          <>
          <NavigationBar />     
          <Details />
        <Loader
        type="TailSpin"
        color="#ff1742"
        height={100}
        width={100}
        className={classes.spinner}
     />
     </>
     );
      }

      else{

      const personcards= this.state.personcards.map(personcard=>{
        return <PersonCard name={personcard.name} ownerkapk={personcard.id}/>
        })

  return (

    <div>
      <NavigationBar/>
      <Details/>
      <h1 className={classes.recentrecipes}>Following</h1>
      {/* <PersonCard /> */}
    
    <div className={classes.persongrid}>
    {personcards}
    </div>

    </div>
  );
}
    }
}
export default FollowingList;