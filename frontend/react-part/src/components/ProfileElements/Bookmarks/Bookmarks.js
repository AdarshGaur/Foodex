import React, { Component } from 'react';
import classes from '../../Navbar/pages/Home/Home.module.css';
import RecipeCard from '../../UI/Card/RecipeCard'
import axios from 'axios';
import ServerService from '../../../services/serverService'
import NavigationBar from '../../Navbar/Navbar';
import Details from '../Details/Details';

class Bookmarks extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null
  }

  componentDidMount(){
    // axios.get('http://af3c2d386213.ngrok.io/desserts/')
    ServerService.maincourse()
    .then(response=>{
      console.log(response.data);
      this.setState({recipecards: response.data})
    })
  }

  render() {

    const recipecards= this.state.recipecards.map(recipecard=>{
    return <RecipeCard title={recipecard.title} img={recipecard.img} pk={recipecard.pk} content={recipecard.content} />
    })

    return(
    <>
    {/* <NavigationBar />
    <Details /> */}
    <NavigationBar />
    <Details />
    <h1 className={classes.recentrecipes}>Bookmarks</h1>
    <div className={classes.grid}>
    {recipecards}

    </div>
    </>
    )
  }
}


export default Bookmarks;

