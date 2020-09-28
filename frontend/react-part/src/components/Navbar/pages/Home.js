import React from 'react';
import classes from './Home.module.css';
import Hero from '../../Hero/Hero';
import Recipecard from '../../UI/Card/RecipeCard'
import NavigationBar from '../Navbar';


export default function Home() {
  return (
    <>
    <NavigationBar />        
    <Hero />

    <div className={classes.cardground}>
    <Recipecard />
    <Recipecard />
    <Recipecard />
    <Recipecard />
    

    </div>

      </>
  );
}


