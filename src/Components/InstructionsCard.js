import React, { useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { useParams } from 'react-router-dom'
import { axiosWithAuth } from './axiosWithAuth'

const InstructionsCard = (props) => {
console.log('instructions props: ', props);

const initialState = {
  id: null,
  name: '',
  instruction: ''
}
const [instructionData, setInstructionData] = useState(initialState)

const params = useParams()

  const getInstructions = (id) => {
    
    axiosWithAuth()
    .get(`https://buildweek-backend-familyrecipe.herokuapp.com/api/recipe/${id}/instructions`)
    .then((res) => {
// console.log('instr data: ', res.data[0]);
      setInstructionData(res.data[0])
    })
    .catch(err => console.log(err))
  }

  useEffect(( )=> {
getInstructions(params.id)
  }, [params.id])

  return (
    <div>
      <Card body inverse color="info">
      <CardTitle tag="h5">Recipe name: {instructionData.name}</CardTitle>
        <CardText>Instructions: {instructionData.instruction}</CardText>
      </Card>
    </div>
  );
};

export default InstructionsCard;