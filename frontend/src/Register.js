import React,{Component} from "react";
import './login.css';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';

class Register extends Component{

    emptyItem = {
        name:'',
        username:'',
        password:''
    };
    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const username = target.username;
        const password = target.password;
        let item = {...this.state.item};
        item[name] = value;
        item[username] = value;
        item[password] = value;
        this.setState({item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        fetch('/Auth/register' , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        window.location.href = "/Auth/login";
    }

    render() {
        const {item} = this.state;
        return (
            <div className="app">

                <Container>

                    <Form className ="formLogReg" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <div className="login-box">
                                <h1 className="account"><centre>Create an account</centre></h1>
                                
                                <div className="input-container">
                                    <Label for="name">Name</Label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Name"
                                        value={item.name}
                                        onChange={this.handleChange}
                                        autoComplete="name"/>
                                </div>

                                <div className="input-container">
                                <Label for="name">Username</Label>
                                    <input type="text"
                                           name="username"
                                           id="username"
                                           placeholder="Username"
                                           value={item.username}
                                           onChange={this.handleChange}
                                           autoComplete="username"/>
                                </div>

                                <div className="input-container">
                                    <Label for="name">Password</Label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={item.password}
                                        onChange={this.handleChange}
                                        autoComplete="password"/>
                                </div>

                                <FormGroup>
                                    <Button className = "button-create" type="submit">Create account</Button>
                                </FormGroup>


                            </div>

                        </FormGroup>
                    </Form>
                </Container>
            </div>

        );
    }
}

export default withRouter(Register) ;