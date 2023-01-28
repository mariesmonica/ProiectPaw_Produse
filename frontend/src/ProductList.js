import {Component} from "react";
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, withRouter} from 'react-router-dom';
import axios from "axios";
import authHeader from "./services/auth-header";

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNjc0OTAxNjI1LCJleHAiOjE2NzQ5ODgwMjV9.xWf_rBIqO8W96C6WxLe-tD1N5t3gyAFo0NVsI-PsAgJ2Wb00AJ63FuiHNUUtSMbr_onBlGZSMgzQkWfXv5fZQQ';



class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {products: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        axios.get("/products-view", {headers: authHeader()})
            .then(response => {
                this.setState({products: response.data});
            }).catch(error => {
            if (error.response) {
                console.log("Response:" + error.response.status);
                if (error.response.status === 403 || error.response.status === 401) {
                    console.log("Redirect....");
                    window.location.href = 'http://localhost:3000/my_login';
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
        await fetch(`/product-delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        }).then(() => {
            let updateProducts = [...this.state.products].filter(i => i.id !== id);
            this.setState({products: updateProducts});
        });
    }

    render() {
        const {products, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        const productList = products.map(product => {
            return <tr key={product.id}>
                <td style={{whiteSpace: 'nowrap'}}>{product.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{product.name}</td>
                <td style= {{whiteSpace: 'nowrap'}}>{product.price}</td>
                <td style= {{whiteSpace: 'nowrap'}}>{product.details}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/product-update/" + product.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(product.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
    
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3><center>Products</center></h3>
                    <center>
                        <Link className="btn btn-outline-primary mx-2" to = "/product-add"><center>Add Products</center></Link>
                    </center>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="5%">Id</th>
                            <th width="30%">Name</th>
                            <th width="20%">Price</th>
                            <th width="60%">Details</th>
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