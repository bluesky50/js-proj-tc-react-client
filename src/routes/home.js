import React, { Component } from 'react';

import SignInForm from '../components/signIn/signInForm.js';

class HomePage extends Component {

    handleSubmit(event) {
        event.preventDefault();

        console.log('Submitting');
        this.props.history.push('/dashboard');
    }

    render() {
      return (
        <div style={pageLayout}>
            <div style={loginLayout}>
                <SignInForm history={this.props.history}/>
                {/* <form style={loginForm} onSubmit={this.handleSubmit.bind(this)}>
                    <div style={formField}>
                        <label>Username</label>
                        <input type="text" name="username" autoFocus/>
                    </div>
                    <div style={formField}>
                        <label>Code</label>
                        <input type="password" name="code"/>
                    </div>
                    <div style={formField}>
                        <button onClick={this.handleSubmit.bind(this)} style={submitButton}>Enter</button>
                    </div>
                </form> */}
            </div>
        </div>
      );
    }
}
  
const pageLayout = {
    height: "100vh",
    width: "100%",
    // background: "#888888",
    // background: "rgb(37, 37, 38)",
    // background: "rgb(47,52,63)",
    // background: "rgb(57,62,75)",
    background: "rgb(38,43,51)", // 47,52,63, 204,204, 200
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
}
/// 30, 30 , 30
// 37, 37, 38
// 51,
// 63,63, 70
const loginLayout = {
    boxShadow: "0 0 4px rgb(30, 30, 30)",
    // boxShadow: "inset 0 0 6px rgb(30,30,30)",
    // background: "rgb(57,62,73)",
    background: "rgb(47,52,63)",
    // background: "rgb(38,43,51)", // 47,52,63, 204,204, 200
    // border: "1px solid rgb(47,52,63)",
    // border: "1px solid rgb(77,82,93)",
    // background: "rgb(51, 51, 51)",
    // background: "#888888",
    // border: "1px solid rgb(116,118,179)",
    display: "flex",
    flexFlow: "column",
    padding: "15px",
    width: "320px",  
};

const loginForm = {
    display:"flex",
    flexFlow: "column"
};

const formField = {
    display: "flex",
}

const loginInput = {
    background: "#888888",
    width: "100%"
};

const loginLabel = {
    color: "rgb(204,204,200)"
};

const submitButton = {
    background: "rgb(38,43,51)"
};

const text = {
    color: "rgb(204,204,200)"
};

export default HomePage;