import React, { Component } from 'react';

import SignInForm from '../components/signIn/signInForm.js';

class HomePage extends Component {

    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push('/dashboard');
    }

    render() {
      return (
        <div style={pageLayout}>
            <div style={loginLayout}>
                <SignInForm history={this.props.history}/>
            </div>
        </div>
      );
    }
}
  
const pageLayout = {
    height: "100vh",
    width: "100%",
    background: "rgb(38,43,51)", 
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
}

const loginLayout = {
    boxShadow: "0 0 4px rgb(30, 30, 30)",
    background: "rgb(47,52,63)",
    display: "flex",
    flexFlow: "column",
    padding: "15px",
    width: "320px",  
};

export default HomePage;