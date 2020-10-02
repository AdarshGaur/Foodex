import React, { Component } from 'react';
import classes from './Categories.module.css';
import RecipeCard from '../UI/Card/RecipeCard'
import NavigationBar from '../Navbar/Navbar';
import axios from 'axios';
import ServerService from '../../services/serverService'

class Drinks extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null
  }

  componentDidMount(){
    axios.get('https://b841ca4ed474.ngrok.io/starters/')
    // ServerService.homecards()
    .then(response=>{
      console.log(response.data);
      this.setState({recipecards: response.data})
    })
  }

  render() {

    const recipecards= this.state.recipecards.map(recipecard=>{
    return <RecipeCard title={recipecard.title} img={recipecard.img_url} pk={recipecard.pk} content={recipecard.content} />
    })

    return(
    <>
      <NavigationBar />     
        <div className={classes.startersCover}>
            Drinks
        </div>

    <div className={classes.grid}>
    {recipecards}

    </div>
    </>
    )
  }
}


export default Drinks;

