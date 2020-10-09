import React, {Component} from 'react';
import NavigationBar from '../../Navbar/Navbar';
import classes from './ReadRecipe.module.css';
import {Link} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';
import LikeButton from '../../UI/LikeButton/LikeButton';
import BookmarkButton from '../../UI/BookmarkButton/BookmarkButton';
import axios from 'axios';
import serverService from '../../../services/serverService';

class AddRecipe extends Component {
    state = {
        isLoading: true,
        recipe: [],
        error: null,
        // text: '  or kadhai, heat a tablespoon of butter and a tablespoon of oil'
        
      }
    
      componentDidMount(){
          const data= this.props.location.state.recipeid;

        console.log(localStorage.getItem('access_token'))

        serverService.readrecipe(data)
        .then(response=>{
          console.log(response);
          this.setState({recipe: response.data})
        })
      }

    render(){
        return (
            <>
                <NavigationBar />
                <div className= {classes.outerwrap}>
                <div className={classes.readrecipe}>
                  {(this.state.recipe.category==='main_course')?<span className={classes.tags}>Main Course</span>: null}
                  {(this.state.recipe.category==='starter')?<span className={classes.tags}>Starters</span>: null}
                  {(this.state.recipe.category==='drink')?<span className={classes.tags}>Drinks and Smoothies</span>: null}
                  {(this.state.recipe.category==='others')?<span className={classes.tags}>Others</span>: null}
                  {(this.state.recipe.category==='desserts')?<span className={classes.tags}>Desserts</span>: null}

                    {this.state.recipe.veg? <span className={classes.tags}>Vegetarian</span>:<span className={classes.tags}>Non-Vegetarian</span>}
                    {/* <span className={classes.tags}>Vegetarian</span> */}
                <h1 className={classes.titlerecipe}>{this.state.recipe.title}</h1>
                {/* <h1>Butter Paneer</h1> */}
                <div className={classes.options}>
                <p className={classes.by}> by
                <Link className={classes.authorname}
                to= {{
                    pathname:'/user-profile',
                    state:{ownerpk: this.state.recipe.ownerkapk}
                  }} 
                >{this.state.recipe.owner}
                </Link>
                </p>
        <p className={classes.extras}>Cooking Time: {this.state.recipe.cook_time} mins</p>
                </div>
                <div className={classes.imgwrap}>
                <img  className={classes.foodimg} 
                src={this.state.recipe.img}
                // src="https://www.cookwithmanali.com/wp-content/uploads/2019/05/Paneer-Butter-Masala-500x500.jpg" 
                
                />
                </div>
                <h2 className={classes.foodhead}>Ingredients</h2>
                <h5 className={classes.ingredients}>
                    {/* Tomato, Onion, Paneer, Pickle, Garlic, Butter, Masala, Cashews, Pickle, Ginger, Wheat. */}
                    {this.state.recipe.ingredients}
                </h5>
                <h2 className={classes.foodhead}>Instructions</h2>
                <h5 className={classes.recipe}>
                {/* or kadhai, heat a tablespoon of butter and a tablespoon of oil.
                Add red chillies, ginger, garlic paste and all the whole spices (bay leaves, cinnamon, cloves, cardamom and peppercorns). Alternatively, you can also wrap the spices in a muslin cloth and add them to the pan (take this out after the tomatoes are cooked down). Saute for a minute or two and add cashew nuts, poppy seeds (if using) and onions. Once the onions turn translucent, add the tomatoes. Mix well */}
              
            {/* {this.state.text} */}

                {this.state.recipe.content}
                </h5>

<div className={classes.btnwrap}>
                <div className={classes.btndivfirst}>
                <LikeButton 
                pk={this.props.location.state.recipeid} 
                likeis= {this.state.recipe.like_is} 
                points= {this.state.recipe.points} 
                />
                <BookmarkButton 
                pk={this.props.location.state.recipeid} 
                />

                </div>
                <div className={classes.btndivsecond}>                
                    <Button className={classes.editbtn} as={Link} 
           to= {{
            pathname:'/edit-recipe',
            state:{recipeid: this.props.location.state.recipeid}
          }} 
          >Edit</Button>

                <button className={classes.deletebtn}>delete</button>
                </div>

</div>

                <h2 className={classes.suggest}>Drop a Suggestion<i className="far fa-sticky-note"></i></h2>
                <textarea rows="10" className={classes.area} name = 'instructions'  placeholder={this.state.instructions} onChange = {this.handlechangeall} />
                <input className={classes.suggestionbtn} type="submit" onClick={this.handlesuggestion} value="SUBMIT SUGGESTION" />
                </div>
                <div className={classes.tips}>
                <Card style={{ width: '18rem' }} className={classes.tipscard}>
                <Card.Header className={classes.tiphead}><i className="fa fa-bullhorn"> </i> Q U I C K - T I P S</Card.Header>
                <Card.Body className={classes.bulletpoints}>
                <Card.Text>
                <ul>
                <li>Write a good, catchy title</li>
                <li>Give clear details about your recipe preparation</li>
                <li>Add a relevant topic to reach the right members</li>
                <li>Check your spelling and grammar</li>
                <li>Become an active member to get recognized</li>
                </ul>
                </Card.Text>
                </Card.Body>
                </Card>
                </div>
                </div>
            </>
        );
    }
}

export default AddRecipe;









