import React, {Component} from 'react';
import NavigationBar from '../../Navbar/Navbar';
import classes from './FollowersList.module.css';
import {Link} from 'react-router-dom';
import PersonCard from '../../UI/Card/PersonCard/PersonCard';
import Details from '../Details/Details';


class FollowersList extends Component {


    render(){
  return (

    <div>
      <NavigationBar/>
      <Details/>
      <PersonCard />
    </div>


  );
}
}

export default FollowersList;