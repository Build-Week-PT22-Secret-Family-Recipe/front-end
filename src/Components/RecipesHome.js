import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { axiosWithAuth } from "./axiosWithAuth";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const RecipesHome = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [recipeNames, setRecipeNames] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  //state to allow page to refresh when state changes
  const [refresh, setRefresh] = useState(false)

  const getRecipes = () => {
    axiosWithAuth()
      .get("/api/recipes")
      .then((res) => {
        console.log("get res: ", res.data);
        setRecipeNames(res.data);
      })

      .catch((err) => console.log("get err: ", err));
  };

  useEffect(() => {
    getRecipes();
  }, [refresh]);

  const handleSearchInput = (e) => {
    // console.log("search input: ", e.target.value);
    setSearchValue(e.target.value)
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    console.log("submit search");
    setRecipeNames(filteredRecipes())
    setSearchValue('')
  };

 let filteredRecipes =  () => { return recipeNames.filter(recipe => recipe.name.toLowerCase().includes(searchValue.toLowerCase()))
    }

console.log('filtered: ', filteredRecipes());

  

  return (
    <Container style={{ marginTop: "100px", width: "500px" }}>
      <Row>
        <Col>
          <h2>Your Recipes!</h2>
<br />
          <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              {/* <Label for="search" className="mr-sm-2">Search by title: </Label> */}
              <Input
                type="text"
                name="search"
                id="search"
                placeholder="Search by title"
                onChange={handleSearchInput}
              />
            </FormGroup>
            <Button onClick={onSearchSubmit}>Submit</Button>
          </Form>
          <br />
          {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Select by meal</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Breakfast</DropdownItem>
              <DropdownItem>Lunch</DropdownItem>
              <DropdownItem>Dinner</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}

          {recipeNames.map((recipeName) => (
            <Container key={recipeName.id} style={{ marginTop: "20px" }}>
              <Row>
                <Col>
                  <RecipeCard recipeName={recipeName} refresh={refresh} setRefresh={setRefresh}/>
                </Col>
              </Row>
            </Container>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default RecipesHome;
