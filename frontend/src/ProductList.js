import { Component } from "react";
import { Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import axios from "axios";
import image from "../src/image.png";


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        axios.get("/Product/products-view", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(response => {
                this.setState({ products: response.data });
            }).catch(error => {
                if (error.response) {
                    console.log("Response:" + error.response.status);
                    if (error.response.status === 403 || error.response.status === 401) {
                        console.log("Redirect....");
                        window.location.href = 'http://localhost:3000/Auth/login';
                        return;
                    }
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });


        // fetch('/products')
        //     .then(response => response.json())
        //     .then(data => this.setState({products: data}));
    }



    async remove(id) {
        await fetch(`/Product/product-delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(() => {
            let updateProducts = [...this.state.products].filter(i => i.id !== id);
            this.setState({ products: updateProducts });
        });
    }

    render() {
        const { products, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        const productList = products.map(product => {
            return <tr key={product.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{product.id}</td>
                <div style={{ whiteSpace: 'nowrap' }}>{product.name}</div>
                <div> <img className = " navbar"src="../image.png" width = "100" height = " 100" alt = " "></img></div>
                <td style={{ whiteSpace: 'nowrap' }}>{product.price}</td>
                {/* <td style= {{whiteSpace: 'nowrap'}}>{product.details}</td> */}
                <td>
                    <dl><Button color="light btn-lg" tag={Link} to={"/Product/product-view/" + product.id}>Details</Button></dl>
                    <dl><Button color="secondary btn-lg" tag={Link} to={"/Product/product-update/" + product.id}>Edit</Button></dl>
                    <dl><Button color="danger btn-lg" tag={Link} onClick={() => this.remove(product.id)}>Delete</Button></dl>
                </td>
            </tr>
            
        });
        

        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <h3><center>Products</center></h3>
                    <center>
                        <Link className="btn btn-outline-primary mx-2" to="/Product/product-add"><center>Add Products</center></Link>

                    </center>
                    <Table className="mt-4">
                        <thead>
                            <tr>

                                <th width="10%">Product number</th>
                                <th width="30%">Product name</th>
                                <th width="20%">Product price</th>
                                {/* <th width="60%">Details</th> */}
                                <th width="20%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );

    }

}

export default ProductList;