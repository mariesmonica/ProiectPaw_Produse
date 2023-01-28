import {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNjc0OTAxNjI1LCJleHAiOjE2NzQ5ODgwMjV9.xWf_rBIqO8W96C6WxLe-tD1N5t3gyAFo0NVsI-PsAgJ2Wb00AJ63FuiHNUUtSMbr_onBlGZSMgzQkWfXv5fZQQ';

//const SOCKET_URL = 'ws://localhost:8081/ws-message';

class ProductEdit extends Component {
    emptyItem = {
        name: '',
        start_price:'',
        details:''
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
        const start_price = target.start_price;
        const details = target.details;

        let item = {...this.state.item};
        item[name] = value;
        item[start_price] = value;
        item[details] =value;
        this.setState({item});
    }

//     let onConnected = () => {
//         console.log("Connected!!")
//         client.subscribe(`/product-update/${this.props.match.params.id}`, (msg) => {
//             if (msg.body) {
//                 const product = JSON.parse(msg.body);
//                 console.log("Price:" + product.start_price);
//                 console.log(product);
//                 this.setState({item: product});

//             }
//         });
//     }

//     let onDisconnected = () => {
//         console.log("Disconnected!!")
//     }

//     const client = new Client({
//         brokerURL: SOCKET_URL,
//         reconnectDelay: 5000,
//         heartbeatIncoming: 4000,
//         heartbeatOutgoing: 4000,
//         onConnect: onConnected,
//         onDisconnect: onDisconnected
//     });

//     client.activate();
// }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch(`/product-update/${this.props.match.params.id}`, {//se coneteaza la pagina product-update
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' :`${token}`
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/products-view');//inapoi la lista de produse
    }


    render() {
        const {item} = this.state;
        const title = <h2>{'Edit Product'}</h2>;
    

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
                        <Label for="start_price">Price</Label>
                        <Input type="text" name="start_price" id="start_price" value={item.start_price}
                               onChange={this.handleChange} autoComplete="start_price"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="details">Details</Label>
                        <Input type="text" name="details" id="details" value={item.details}
                               onChange={this.handleChange} autoComplete="details"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="secondary" tag={Link} to="/products-view">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>)
    }
}

export default withRouter(ProductEdit);