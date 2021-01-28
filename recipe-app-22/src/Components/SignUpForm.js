import React,{useState} from "react";
import { Button, Form, Input} from "reactstrap";

function SignUpForm (){
    const [signForm, setSignForm] = useState({
        username : "",
        password : ""
    });

    const inputChange = e => {
        setSignForm({...signForm, [e.target.name] : e.target.value});
    };

    const formSubmit = e => {
        e.preventDefault();
        //axios request
    };

    return (
        <Form onSubmit = {formSubmit}>
            <Input 
            type = "text"
            name  = "username"
            placeholder = "UserName"
            value = {signForm.username}
            onChange = {inputChange}
            />

            <Input 
            type = "password"
            name = "password"
            placeholder = "PassWord"
            value = {signForm.password}
            onChange = {inputChange}
            />
            <Button color = "primary">Submit</Button>
        </Form>
    )
}

export default SignUpForm;