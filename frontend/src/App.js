import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import {Component} from "react";
import Home from './Home'
import ProductList from "./ProductList";
import ProductEdit from "./ProductEdit";
import ProductAdd from './ProductAdd';
import Login from "./Login";
import Register from './Register';
import ProductDetails from './ProductDetails';


class App extends Component {
    state = {
        products: []
    
    };

    // render() {
    //     const {products} = this.state
    //     return (
    //         <div className="App">
    //             <header className="App-header">
    //                 <img src={logo} className="App-logo" alt="logo"/>
    //                 <div className="App-intro">
    //                     <h2>Products</h2>
    //                     {products.map(product =>
    //                         <div key={product.id}>
    //                             {product.name}
    //                         </div>
    //                     )}
    //                 </div>
    //             </header>
    //         </div>
    //     );
    // }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true}><Home/></Route>
                    <Route path='/Auth/register'><Register/></Route>
                    <Route path='/Auth/login'><Login/></Route>
                    <Route path='/Product/products-view' exact={true}><ProductList/></Route>
                    <Route path='/Product/product-update/:id'><ProductEdit/></Route>
                    <Route path='/Product/product-add' exact={true}><ProductAdd/></Route>
                    <Route path='/Product/product-view/:id'><ProductDetails/></Route>
                </Switch>
            </Router>
        )
    }
}
export default App;