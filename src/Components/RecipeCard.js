import React, { useState } from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom'
import { axiosWithAuth } from './axiosWithAuth';
import axios from 'axios'
import EditRecipeForm from './EditRecipeForm';


const RecipeCard = (props) => {
console.log('card props: ', props);

const [clicked, setClicked] = useState(false)

const id = props.recipeName.id
console.log('id:', id);

const deleteRecipe = () => {
axiosWithAuth()
.delete(`/api/recipes/${id}`)
.then((res) => console.log('delete res: ', res))
.catch(err => console.log('delete err: ', err))
}

const editRecipe = () => {
  axiosWithAuth()
  .put(``, )
  .then((res) => {
    console.log('put res: ', res)
  })
  .catch(err => console.log('put err: ', err))
}

  return (
    <div>
      <Card body outline color='success' style={{backgroundColor: '#E6BD8F'}}>
        <CardTitle tag='h5'>{props.recipeName.name}</CardTitle>
       <Link key={id} to={`/Home/instructions/${id}`} style={{color: '#347382'}}>
       <h5>Click for instructions</h5>
       </Link>
       <Button style={{marginTop: '10px', width: '170px', backgroundColor: '#DE7F6E'}} onClick={deleteRecipe}>Delete Recipe</Button>
       
       <Button style={{marginTop: '10px', width: '170px', backgroundColor: '#93A586'}} onClick={() => {setClicked(!clicked)}}>Edit Recipe</Button>
{clicked && <EditRecipeForm id={props.recipeName.id}/>}
      </Card>
    </div>
  );
};

export default RecipeCard;