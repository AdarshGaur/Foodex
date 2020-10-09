import React, { Component } from 'react';
import classes from '../../Navbar/pages/Home/Home.module.css';
import RecipeCard from '../../UI/Card/RecipeCard'
import axios from 'axios';
import ServerService from '../../../services/serverService'
import NavigationBar from '../../Navbar/Navbar';
import Details from '../Details/Details';

class MyRecipes extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null
  }

  componentDidMount(){
    axios.get('https://f301cd771e23.ngrok.io/user/recipe-list/')
    // ServerService.homecards()
    .then(response=>{
      console.log(response.data);
      this.setState({recipecards: response.data})
    })
  }

  render() {

    const recipecards= this.state.recipecards.map(recipecard=>{
      console.log(recipecard.pk)
    return <RecipeCard title={recipecard.title} img={recipecard.img} pk={recipecard.pk} content={recipecard.content} />
    })

    return(
    <>
    <NavigationBar />
    <Details />
    <h1 className={classes.recentrecipes}>Posts</h1>
    <div className={classes.grid}>
    {recipecards}

    </div>
    </>
    )
  }
}


export default MyRecipes;

