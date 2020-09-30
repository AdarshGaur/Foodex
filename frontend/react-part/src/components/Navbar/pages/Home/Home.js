import React,{Component} from 'react';
import classes from './Home.module.css';
import Hero from '../../../Hero/Hero';
import RecipeCard from '../../../UI/Card/RecipeCard'
import NavigationBar from '../../Navbar';
import axios from 'axios';


class Home extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null
  }

  componentDidMount(){
    axios.get('https://8ca171214697.ngrok.io/')
    .then(response=>{
      console.log(response.data);
      this.setState({recipecards: response.data})
    })
  }

  render() {

    const recipecards= this.state.recipecards.map(recipecard=>{
    return <RecipeCard title={recipecard.title} img={recipecard.img} content={recipecard.content} />
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

