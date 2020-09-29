import React from 'react';
import classes from './Home.module.css';
import Hero from '../../../Hero/Hero';
import RecipeCard from '../../../UI/Card/RecipeCard'
import NavigationBar from '../../Navbar';


export default function Home() {
  return (
    <>
    <NavigationBar />     
    <div>   
    <Hero />
    </div>

    {/* <div className={classes.cardground}> */}
    <RecipeCard />
    

    {/* </div> */}

      </>
  );
}


