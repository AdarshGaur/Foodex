import React, { Component } from 'react';
import classes from '../../Navbar/pages/Home/Home.module.css';
import RecipeCard from '../../UI/Card/RecipeCard'
import axios from 'axios';
import ServerService from '../../../services/serverService'
import NavigationBar from '../../Navbar/Navbar';
import Details from '../Details/Details';
import Loader from 'react-loader-spinner'

class MyRecipes extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null
  }

  componentDidMount(){
    ServerService.myrecipes()
    .then(response=>{
      // console.log(response.data);
      this.setState({recipecards: response.data, isLoading: false})
    })
  }

  render() {

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

    const recipecards= this.state.recipecards.map(recipecard=>{
      // console.log(recipecard.pk)
    return <RecipeCard title={recipecard.title} img={recipecard.img} key={recipecard.pk} readtime={recipecard.read_time} pk={recipecard.pk} content={recipecard.content} />
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
}


export default MyRecipes;

