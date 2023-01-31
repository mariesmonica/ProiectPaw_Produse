import React, { Component } from "react";

import { Container, Form, FormGroup, Label } from "reactstrap";
import './login.css';

class Login extends Component {

    emptyItem = {
        username: '',
        password: '',
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
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;
        console.log(item);
        fetch('/Auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((response) => response.text()).then((result) => {
            if (result != "this user doesn't exist") {
                localStorage.setItem('jwt', result);
                window.location.href = "/Product/products-view";
            } else {
                alert("Wrong data! Check again")
            }
        });
    }

    render() {
        const { item } = this.state;
        return (

            <div className="app">
                <h1><center>Login in your account</center></h1>
                <Container>

                    <Form className ="formLogReg"onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <div className="input-container">
                                <Label for="name">Username</Label>
                                <input type="text"
                                       name="username"
                                       id="username"
                                       value={item.username}
                                       onChange={this.handleChange}
                                       autoComplete="username"/>


                                <div className="input-container">
                                    <Label for="name">Password</Label>
                                    <input type="password"
                                           name="password"
                                           id="password"
                                           value={item.password}
                                           onChange={this.handleChange}
                                           autoComplete="password"/>
                                </div>
 
                                <button className="btn_sign">Sign in</button>

                                <a href="/Auth/register">
                                    <input type="button" className="btn_register" value="Register"/>
                                </a>

                            </div>

                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}
export default Login;