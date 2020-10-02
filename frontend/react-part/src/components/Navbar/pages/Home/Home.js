import React, { Component } from 'react';
import classes from './Home.module.css';
import Hero from '../../../Hero/Hero';
import RecipeCard from '../../../UI/Card/RecipeCard'
import NavigationBar from '../../Navbar';
import axios from 'axios';
import ServerService from '../../../../services/serverService'

class Home extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null
  }

  componentDidMount(){
    // axios.get('https://60bb5774f441.ngrok.io/')
    ServerService.homecards()
    .then(response=>{
      console.log(response);
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
    <div>   
    <Hero />
    </div>

    <div className={classes.grid}>
    {recipecards}

    </div>
    </>
    )
  }
}


export default Home;

