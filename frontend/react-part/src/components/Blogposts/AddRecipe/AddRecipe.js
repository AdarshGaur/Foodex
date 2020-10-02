import React, {Component} from 'react';
import NavigationBar from '../../Navbar/Navbar';
import classes from './AddRecipe.module.css';
import {Link} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap'


class AddRecipe extends Component {

    state = { 
    title:"",
    titleLimit:50,
    ingredients:"",
    ingredientsLimit: 300,
    content:"",
    contentLimit:4000,
    category:"starters",
    veg:true,
    cook_time: 60
  }

    handlechangeall = (event) =>{
        this.setState ( { [event.target.name] :event.target.value  } )
    }   
    
    

    render(){
        return (
            <>
                <NavigationBar />
                <div className= {classes.outerwrap}>
                <div className={classes.addrecipe}>
                <h1>Share Your Recipe</h1>
                
                

        <form onSubmit = {this.handleOnSubmit}>

            <label className={classes.labels}><h3>Recipe Title</h3></label>
            <input type="text" className={classes.area} name = 'title'  placeholder={this.state.title} onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.title.length}/{this.state.titleLimit}</p>
            <label ><h3>Ingredients</h3></label>
            <input type="text" className={classes.area} name = 'ingredients'  placeholder={this.state.ingredients} onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.ingredients.length}/{this.state.ingredientsLimit}</p>
            <label ><h3>Instructions</h3></label>
            <textarea rows="10" className={classes.area} name = 'content'  placeholder={this.state.instructions} onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.content.length}/{this.state.contentLimit}</p>
            <label><h3>Category</h3></label>
            <select name='category' className={classes.ddlist} onChange={this.handlechangeall}>
            <option value="starters">Starters</option>
            <option value="maincourse">Main Course</option>
            <option value="deserts">Deserts</option>
            <option value="drink">Drinks and Smoothies</option>
            <option value="others">Others</option>
            </select>

            <label className={classes.labels}><h3>Tag</h3></label>
            <select name='veg' className={classes.ddlist} onChange={this.handlechangeall}>
            <option value="true">Vegetarian</option>
            <option value="false">Non-Vegetarian</option>
            </select>

            <label className={classes.labels}><h3>Cooking Time:</h3></label>
            <input type="number" className={classes.cooktime} name = 'cook_time'   onChange = {this.handlechangeall} /> minutes
   
   <br />

            <label className={classes.labels}><h3>Upload Image:</h3></label>
            {/* <div className={classes.imgcontainer}> */}
            <input className={classes.hidden} id="postimage" type="file" name="img" accept="image/*" />
            <label className={classes.imgbtn} for="postimage">Add Image</label>
            {/* </div> */}

            <input className={classes.area} type="submit" value="Submit" />

        </form>

                </div>
                <div className={classes.tips}>
                <Card style={{ width: '18rem' }} className={classes.tipscard}>
                <Card.Header>Quick Tips</Card.Header>
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









