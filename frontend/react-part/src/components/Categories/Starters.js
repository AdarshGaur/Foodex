import React, { Component } from 'react';
import classes from './Categories.module.css';
import RecipeCard from '../UI/Card/RecipeCard'
import NavigationBar from '../Navbar/Navbar';
import axios from 'axios';
import ServerService from '../../services/serverService'

class Starters extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null
  }

  componentDidMount(){
    // axios.get('http://af3c2d386213.ngrok.io/starters/')
    ServerService.starters()
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
            Starters
        </div>

    <div className={classes.grid}>
    {recipecards}

    </div>
    </>
    )
  }
}


export default Starters;

