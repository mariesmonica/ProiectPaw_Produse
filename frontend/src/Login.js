import {Component} from "react";
import {Button, ButtonGroup, Container, CustomInput, Table} from 'reactstrap';
import AppNavbar from "./AppNavbar";
import axios from "axios";


class Login extends Component {

    state = {
        username: "",
        password: ""
    };


    handleChange = e => {
        this.setState({[e.currentTarget.id]: e.currentTarget.value});
    };

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <form className="form">
                        Username:
                        <CustomInput
                            id="username"
                            onChange={this.handleChange}
                            type="text"
                        />
                        Password:
                        <CustomInput
                            id="password"
                            onChange={this.handleChange}
                            type="password"
                        />

                        <Button type="button" color="primary" onClick={() => this.login()}
                                className="form__custom-button">
                            Log in
                        </Button>
                    </form>

                </Container>
            </div>
        );
    }

    login() {
        axios.post('/login', this.state
        ).then(response => {
            console.log("Redirect....");
            console.log(response);
            console.log(response.data.token);
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
                window.location.href = 'http://localhost:3000/products';
            }


        })
        // fetch('/login', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(this.state),
        // }).then(() => {
        //     console.log("Redirect....");
        //     window.location.href = 'http://localhost:3000/products';
        //
        // });
        return undefined;
    }
}

export default Login;