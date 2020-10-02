import React, { Component } from 'react';
import classes from './SearchPage.module.css';

import RecipeCard from '../../components/UI/Card/RecipeCard'
import NavigationBar from '../../components/Navbar/Navbar';
import axios from 'axios';
import ServerService from '../../services/serverService'

class SearchPage extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null
  }

//   componentDidMount(){
    // axios.get('https://60bb5774f441.ngrok.io/')
    // // ServerService.homecards()
    // .then(response=>{
    //   console.log(response.data);
    //   this.setState({recipecards: localStorage.getItem('search_result')})
    // })

//   }

  componentDidMount(){
    const data={
        search: this.props.location.state.searchterm,
        redirect:null 
      }

      console.log(data)
      // axios.post('https://b841ca4ed474.ngrok.io/search/',data)
      ServerService.searchpage(data)
      .then((resp)=>{
        console.log(resp);
        // const search_res=resp.data
        // console.log(search_res);
        if (resp.status === 200) {
            this.setState({recipecards: resp.data})
            console.log(this.state.recipecards)
        }
      
      })
  }


  render() {

    const recipecards= this.state.recipecards.map(recipecard=>{
    return <RecipeCard title={recipecard.title} img={recipecard.img_url} pk={recipecard.pk} content={recipecard.content} />
    })

    return(
    <>
      <NavigationBar />     


    <div className={classes.grid}>
    {recipecards}

    </div>
    </>
    )
  }
}


export default SearchPage;

