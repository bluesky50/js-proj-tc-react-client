import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from '../../reduxActions/authActions.js';

import TextFieldGroup from '../textFieldGroup/textFieldGroup.js';

const rms = ["blockchain", "cs3", "home", "lambda"];
const blockedNames = ['server', 'admin', 'mod', 'moderator'];

class SignInForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            accessCode: '',
            errors: {},
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    isValidInput() {
        const { username, accessCode } = this.state;

        if (username.trim() && username.trim().length < 30 && accessCode.trim() && rms.includes(accessCode)) {
            for (let bn of blockedNames) {
                if (username.toLowerCase().includes(bn)) {
                    return false;
                }
            }
            return true;
        }

        return false;
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        // console.log('Submitting', this.state.username);
        // TODO: Add validation check for inputs.
        // sendUserInfoToServer();
        // checkIfUserAuthTokenIsReturned();
        // If valid:
        // Then push user to /dashboard with new token
        if (this.isValidInput()) {
            this.setState({isLoading: true});
            this.props.login(this.state.username.trim(), this.state.accessCode.trim().toLowerCase());
            // this.props.login({ username: this.state.username, accessCode: this.state.accessCode })
            //     .then(
            //         (res) => this.context.router.push('/'),
            //         (err) => this.setState({ errors: err.data.erros, isLoading: false })
            //     );
            this.props.history.push('/dashboard');
        }  
    }

    render() {
        return(
            <form style={formLayout} onSubmit={this.onSubmit}>
                <h2 style={headerStyle}>Sign In</h2>
                
                <TextFieldGroup
                    field="username"
                    label="Username"
                    value={this.state.username}
                    onChange={this.onChange}
                    labelStyle={labelStyle}
                    inputStyle={inputStyle}
                    layout={formField}
                />

                <TextFieldGroup
                    field="accessCode"
                    label="Access Code"
                    value={this.state.accessCode}
                    onChange={this.onChange}
                    type="text"
                    labelStyle={labelStyle}
                    inputStyle={inputStyle}
                    layout={formField}
                />
                {/* <div style={formField}>
                    <label>Username</label>
                    <input type="text" name="username" onChange={this.onChange} value={this.state.username} autoFocus/>
                </div>
                <div style={formField}>
                    <label>Access Code</label>
                    <input type="password" name="accessCode" onChange={this.onChange} value={this.state.accessCode}/>
                </div> */}
                
                <button style={buttonStyle} type="submit">Enter</button>
                

            </form>
        );
    }
}

const formLayout = {
    alignItems: "center",
    display: "flex",
    flexFlow: "column"
}

const headerStyle = {
    color: "rgb(117,122,133)",
    marginBottom: "0 0 14px 0",
    lineHeight: 1,
    textShadow: "0 0 3px rgb(30,30,30)"
}

const formField = {
    alignItems: "center",
    display: "flex",
    marginBottom: "20px",
    justifyContent: "center",
    // width: "220px"
}

const inputStyle = {
    // background: "rgb(38,43,51)",
    background: "rgb(47,52,63)",
    // border: "1px solid rgb(38,43,51)",
    // border: "1px solid rgb(77,82,93)",
    // border: "none",
    border: "1px solid rgb(117,122,133)",
    boxShadow: "inset 0 0 3px rgb(30,30,30)",
    color: "rgb(117,122,133)",
    fontSize:"14px",
    outline: "none",
    padding: "10px",
    textAlign: "center",
    width: "200px"
}

const labelStyle = {
    background: "rgb(38,43,51)",
    color: "1px solid rgb(97,102,113)",
    fontSize: "12px",
    padding: "10px"
}

const buttonStyle = {
    // background: "rgb(38,43,51)",
    // border: "1px solid rgb(47,52,63)",
    // border: "1px solid rgb(38,43,51)",
    // color: "rgb(77,82,93)"
    background: "rgb(117,122,133)",    
    border: "none",
    boxShadow: "0 0 3px rgb(30,30,30)",
    color: "rgb(38,43,51)",
    fontWeight: "bold",
    padding: "6px",
    // marginTop: "10px",
    marginBottom: "10px",
    outline: "none",
    width: "80px",
    
}

const mapStateToProps= (state) => {
    return {
        userInfo: state.userInfo
    };
};

const mapActionsToDispatch = (dispatch) => {
    return bindActionCreators({
        login
    }, dispatch);
}

// export default SignInForm;
export default connect(mapStateToProps, mapActionsToDispatch)(SignInForm);