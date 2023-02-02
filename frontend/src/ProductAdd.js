import {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';
import jwt_decode from "jwt-decode";

class ProductAdd extends Component {
    emptyItem = {
        name: '',
        price:'',
        details:'',
        id_user:''
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
        const value= target.value;

        const name = target.name;
        const price = target.price;
        const details = target.details;
        const id_user = target.id_user;

        let item = {...this.state.item};
        item[name] = value;
        item[price] = value;
        item[details] =value;
        item[id_user] =value;
        this.setState({item});

       
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(item)
        await fetch('/Product/product-add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                 Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/Product/products-view');//inapoi la lista de produse
    }


    render() {
        const {item} = this.state;
        const title = <h2><center>{'Add Product'}</center></h2>;
        
        const decoded = jwt_decode(localStorage.getItem("jwt"));
        item.id_user = decoded.Id;

        return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input type="text" name="price" id="price" value={item.price}
                               onChange={this.handleChange} autoComplete="price"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="details">Details</Label>
                        <Input type="text" name="details" id="details" value={item.details}
                               onChange={this.handleChange} autoComplete="details"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="secondary" tag={Link} to="/Product/products-view">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>)
    }
}

export default withRouter(ProductAdd);