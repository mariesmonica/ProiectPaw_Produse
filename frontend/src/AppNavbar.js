import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="navbar-brand mb-0 h1" >

                        <Link align="center" className="navbar-brand" width="100" height="100" to="/">
                            Licitatii-Publice
                        </Link>
                        <a align="center" className="navbar-brand" ><img src="../licitatii_publice.png" width="100" height="100" to="/Product/"></img></a>
                    </div>


                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                   
                        <a> <Link  className="btn btn-outline-success" to="/Auth/login"  >Sign in</Link></a>
                    </div>

                </nav>
            </div>
        )
    }
}

