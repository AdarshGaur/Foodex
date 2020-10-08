import React, {Component} from 'react';
import NavigationBar from '../../Navbar/Navbar';
import classes from '../FollowersList/FollowersList.module.css';
import {Link} from 'react-router-dom';
import PersonCard from '../../UI/Card/PersonCard/PersonCard';
import Details from '../Details/Details';


class FollowingList extends Component {


    render(){
  return (

    <div>
      <NavigationBar/>
      <Details/>
      <h1 className={classes.recentrecipes}>Following</h1>
      <PersonCard />
    </div>


  );
}
}

export default FollowingList;