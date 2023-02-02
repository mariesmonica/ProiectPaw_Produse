import { Component } from "react";
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import jwt_decode from "jwt-decode";

class ProductDetails extends Component {

    emptyItem = {
        name: '',
        price: '',
        details: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            item: this.emptyItem
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== null)
            axios.get(`/Product/product-view/${this.props.match.params.id}`, { 
                headers:
                { 
                    Authorization: "Bearer " + localStorage.getItem("jwt") 
                } 
            })
                .then(response => {
        
                    this.setState({
                        product: response.data,
                        item: {
                            name: response.data.name,
                           
                            details: response.data.details
                        }
                    });
                });
    }

    async pageUpdate() {
        if (this.props.match.params.id !== null)
            axios.get(`/Product/product-view/${this.props.match.params.id}`, { headers: { Authorization: "Bearer " + localStorage.getItem("jwt") } })
                .then(response => {
                    
                    this.setState({
                        product: response.data,
                        item: {
                            name: response.data.name,
                            details: response.data.details
                        }
                    });
                });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;

        let item = { ...this.state.item };
        item["price"] = value;

        this.setState({ item });

    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item, product } = this.state;
        const decoded = jwt_decode(localStorage.getItem("jwt"));
        

        if (decoded.Id !== product.id_user && product.price < item.price) {
            await fetch(`/Product/product-update/${this.props.match.params.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/Product/product-view/' + this.props.match.params.id);
        } else if (decoded.Id === product.id_user) {
            alert("Nu se poate efectua licitarea");
        } else {
            alert("Se cere un pret mai mare");
        }
        this.pageUpdate()
    }

    render() {
        const { item } = this.state;
        const { product, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        //console.log(product);
        console.log(item.price);

        return (
            <div>
                <AppNavbar />
                <h2>Product details</h2>
                <Container fluid>
                        
                        <Table className="">
                            <thead>
                                <tr>
                                    <th width="10%">Name</th>
                                    <th width="10%">Price</th>
                                    <div><th width="30%">Details</th></div>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={product.id}>
                                    <td style={{ whiteSpace: 'nowrap' }}>{product.name}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{product.price} </td>
                                    <div>
                                      <td style={{ whiteSpace: 'nowrap' }}>{product.details}</td>
                                    </div>

                                </tr>
                            </tbody>
                        </Table>

                       
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="price">Your price bid:</Label>
                                    <Input type="text" name="price" id="price" value={item.price}
                                        onChange={this.handleChange} autoComplete="price" />
                                
                                        <Button color="btn btn-info" type="submit">Bid</Button>
                                    
                                </FormGroup>
                            </Form>
                        
                    
                </Container>
            </div>
        );
    }
}

export default withRouter(ProductDetails);