import React, { Component } from 'react';
import classes from './SearchPage.module.css';

import RecipeCard from '../../components/UI/Card/RecipeCard'
import SearchNavbar from '../../components/Navbar/SearchNavbar';
import axios from 'axios';
import ServerService from '../../services/serverService'


class SearchPage extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null,
    newsearch:this.props.location.state.searchterm,
    data:"points-high-to-low",
    veg:"true"
  }

submitsort=(event)=>{


  const sortdata={
    search: this.state.newsearch,
    data: this.state.data,
    veg: this.state.veg
  }

console.log(sortdata)
  // axios.post('http://af3c2d386213.ngrok.io/search/sort/',sortdata)
  ServerService.sort(sortdata)
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

handlechangeall = (event) =>{
  this.setState ( { [event.target.name] :event.target.value  } )
 }

handlesubmit = (event) => {
  const data={
    search: this.state.newsearch,
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
      {/* <NavigationBar />    */}
      <SearchNavbar />
      <select name='data' className={classes.ddlist} onChange={this.handlechangeall}>
            <option value="points-high-to-low">Points- high to low</option>
            <option value="points-low-to-high">Points- low to high</option>
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
      </select>

      <select name='veg' className={classes.ddlist} onChange={this.handlechangeall}>
            <option value="true">Vegetarian</option>
            <option value="false">Non-Vegetarian</option>
            <option value="all">Both</option>
      </select>
      <button onClick={this.submitsort} className={classes.sortbtn}>Sort</button>

<div className={classes.searchpagebar}>
       <input  type="text" name="newsearch" className={classes.sbar}
    onChange={this.handlechangeall} />
    <button className={classes.sbtn} onClick={this.handlesubmit} type="submit" value="SUBMIT" ><i class="fa fa-search" aria-hidden="true"></i></button>
    </div>

      <div className={classes.grid}>
      {recipecards}

      </div>
    </>
    )
  }
}


export default SearchPage;

