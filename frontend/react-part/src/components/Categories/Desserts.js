import React, { Component } from 'react';
import classes from './Categories.module.css';
import RecipeCard from '../UI/Card/RecipeCard'
import NavigationBar from '../Navbar/Navbar';
import axios from 'axios';
import ServerService from '../../services/serverService'

class Desserts extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null
  }

  componentDidMount(){
    // axios.get('http://af3c2d386213.ngrok.io/desserts/')
    ServerService.desserts()
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
      <NavigationBar />     
        <div className={classes.dessertsCover}>
            Desserts
        </div>

    <div className={classes.grid}>
    {recipecards}

    </div>
    </>
    )
  }
}


export default Desserts;

