import React from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import MessagesList from './messagesList.js';

// import { addMessage, setMessages } from '../../reduxActions/messagesActions.js';
import { isValidInputString } from '../../helpers/validation.js';
import { setUsers } from '../../reduxActions/usersActions.js';
import { setTopics } from '../../reduxActions/topicsActions.js';

import { CREATE_MESSAGE, CREATE_TOPIC, ADD_SIGNALED_USER, REMOVE_SIGNALED_USER } from '../../helpers/events.js';
import { SET_SUBJECT } from '../../reduxTypes/subjectTypes.js';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSignalButton = this.handleSignalButton.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSignalButton() {
        const { signaledUsers, userInfo, socket } = this.props;
        if (signaledUsers.includes(userInfo.username)) {
            socket.emit(REMOVE_SIGNALED_USER, userInfo.username);
            return;
        }
        socket.emit(ADD_SIGNALED_USER, userInfo.username);
    }

    topicExists(topicString) {
        for (let t of this.props.topics) {
            if (t.topic === topicString) {
                return true;
            }
        }
        return false;
    }

    getTopic(topicString) {
        for (let t of this.props.topics) {
            if (t.topic === topicString) {
                return t;
            }
        }
        return undefined;
    }

    onSubmit(event) {
        event.preventDefault();
        const { socket } = this.props;

        if (this.state.text[0] === '!' && this.state.text.length < 400) {
            socket.emit(SET_SUBJECT, this.state.text.slice(1).trim(), (data) => {
                console.log(data);
            });

            this.setState({
                text: ''
            });
            return;
        }

        if(isValidInputString(this.state.text) && socket) {
            
            socket.emit(CREATE_MESSAGE, { text: this.state.text }, function(data) {
                // console.log('created_message callback', data);
                console.log(data);
            });

            if (this.state.text.includes('#')) {
                const filteredStrings = this.state.text.split(' ').filter((str) => {
                    return str[0] ==='#';
                });
                filteredStrings.forEach((str) => {
                    const t = this.getTopic(str.slice(1).toLowerCase());
                    if (t) {
                        if (!t.voters.includes(this.props.userInfo.username)) {
                            socket.emit(CREATE_TOPIC, str.slice(1).toLowerCase(), function(data) {
                                console.log(data);
                            });
                        }
                    } else {
                        socket.emit(CREATE_TOPIC, str.slice(1).toLowerCase(), function(data) {
                            console.log(data);
                        });
                    }
                });
            }

            this.setState({
                text: ''
            });
        }
    }

    mapUsers() {
        return this.props.users.map((u, index) => {
            if (this.props.signaledUsers.includes(u)) {
                return <p key={index} style={userTextStyle}>{u} *</p>;
            }
            return <p key={index} style={userTextStyle}>{u}</p>;
        });
    }

    mapTopics() {
        return this.props.topics.map((t, index) => {
            return <p key={index} style={topicTextStyle}>#{t.topic} ({t.voters.length})</p>;
        });
    }

    mapMessages() {
        return this.props.messages.map((m, index) => {
            if (m.author.toLowerCase() === 'server') {
                return <p key={index} style={{color: "darkgray", textShadow: "0 0 2px purple", fontSize: "14px", marginTop: "7px"}}><strong>{m.author}: </strong> {m.text}</p>
            } else {
                return <p key={index} style={{color: "darkgray", textShadow: "0 0 4px rgb(30,30,30)", fontSize: "14px", marginTop: "7px"}}><strong>{m.author}: </strong> {m.text}</p>
            }
        });
    }

    // mapStuff() {
    //     const arr = [];
    //     for (let i = 0; i < 200; i++) {
    //         arr.push(<p key={i}>Something</p>);
    //     }
    //     return arr;
    // }

    // Topics #1a819b
    //                     rgb(193, 106, 177)

    render() {
        // const {username, room} = this.props.userInfo;
        return (
            // <div style={compLayout}>
            //     <div style={leftLayout}>
            //         <div style={messagesLayout}>
            //             <h4 style={headerStyle}>Chat @{room} / {username}</h4>
            //             {/* // TODO Make a header that has channel, and user name
            //             // make a pinned message area */}
            //             <MessagesList/>
            //         </div>
                
            //         <form style={inputLayout} onSubmit={this.onSubmit}>
            //             <input name="text" onChange={this.onChange} style={inputStyle} value={this.state.text} type="text" placeholder="Type message here..." autoFocus/>
            //             <button style={buttonStyle} type="submit">Submit</button>
            //         </form>
            //     </div>

            //     <div style={rightLayout}>
            //         <div style={topicsLayout}>
            //             <h4 style={headerStyle}>Topics</h4>
            //             Topics #1a819b
            //             rgb(193, 106, 177)
            //             {this.mapTopics()}
            //         </div>
            //         <div style={usersLayout}>
            //             <h4 style={headerStyle}>Users</h4>
            //             {this.mapUsers()}
            //         </div>
            //     </div>
            // </div>

            <div style={{display: "flex", flex: 1, borderTop: "2px solid rgb(47,52,63)"}}>
                <div style={{display: "flex", flexDirection: "column", flexGrow: 1, height: "100%"}}>
                    <div style={{display: "flex", flexDirection:"column", flexGrow: 1, boxShadow: "inset 0 0 3px rgb(30, 30, 30)"}}>
                        <div style={headerLayout}>
                            <h4 style={headerStyle}>Chat</h4>
                            <div style={filterButtonContainer}>
                                <button style={filterButtonStyle}>Q</button>
                                <button style={filterButtonStyle}>M</button>
                                <button style={filterButtonStyle}>T</button>
                            </div>
                        </div>
                        <p style={{fontSize: "14px", color: "rgb(97,102,113)", padding: "0 20px 0 20px"}}>Room: {this.props.userInfo.room} / User: {this.props.userInfo.username}</p>
                        <div style={{width: "100%", padding: "10px", display: "flex", flexDirection: "column"}}>
                            {/* <h5 style={{color: "orange", padding: "0 0 10px 10px", margin: "0"}}>Chat Subject:</h5> */}
                            <p style={{color: "rgb(191, 154, 68)", fontSize: "14px", padding: "10px 10px 20px 10px", margin: "0", borderBottom: "2px solid rgb(47,52,63)", }}>{this.props.subject}</p>
                        </div>
                        <div style={test1}>
                            {this.mapMessages()}
                        </div>
                    </div>
                    <form style={test2} onSubmit={this.onSubmit}>
                        <input name="text" onChange={this.onChange} style={inputStyle} value={this.state.text} type="text" placeholder="Type message here... (#topic, @user, !subject, Q:question, R:response)" autoFocus/>
                        <button style={buttonStyle} type="submit">Submit</button>
                        {/* <div style={{border: "1px solid rgb(27,32,43)", display: "flex"}}>
                            
                        </div>     */}
                    </form>
                </div>
                <div style={{minWidth: "260px", width: "260px", height: "100%", display: "flex", flexDirection: "column", borderLeft: "2px solid rgb(47,52,63)"}}>
                    <div style={topicsLayout}>
                        <h4 style={headerStyle}>Topics</h4>
                        {this.mapTopics()}
                    </div>
                    <div style={usersLayout}>
                        <div style={headerContainer}>
                            <div style={{display: "flex"}}>
                                <h4 style={headerStyle}>Users </h4>
                                <p style={userCountTextStyle}>( {this.props.signaledUsers.length} / {this.props.users.length} )</p>
                            </div>
                            <button onClick={this.handleSignalButton} style={{color: "rgb(38,43,51)", background: "gray", outline: "none", border: "none", marginLeft: "12px"}}>signal</button>
                        </div>
                        {this.mapUsers()}
                    </div>
                </div>
            </div>
        );
    }
}

const test1 = {
    flexGrow: 1,
    overflowY: "auto",
    padding: "20px"
    // -webkit-overflow-scrolling: touch;
}

const test2 = {
    // background: "#e6eaee",
    background: "rgb(47,52,63)",
    borderTop: "2px solid rgb(47,52,63)",
    display: "flex",
    padding: "10px",
    /*height: 60px;*/
    flexShrink: 0
}

const topicTextStyle = {
    color: "rgb(193, 106, 177)",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "6px 0 0 0"
}

const userTextStyle = {
    // color: "rgb(97,102,113)",
    // color: "rgb(193, 106, 177)",
    color: "#1a819b",
    fontSize: "14px",
    margin: "6px 0 0 0"
}

// const compLayout = {
//     borderTop: "2px solid rgb(47,52,63)",
//     // padding: "20px",
//     display: "flex",
//     flexGrow: 1,
//     // height: "100%"
// }

const headerContainer = {
    display: "flex",
    justifyContent: "space-between"
}

const headerStyle= {
    color: "rgb(97,102,113)",
    margin: "0 12px 0 0"
}

const userCountTextStyle = {
    fontSize: "14px",
    color: "rgb(97,102,113)",
    margin: "0 0"
}

// const leftLayout = {
//     display: "flex",
//     height: "100%",
//     flexFlow: "column",
//     // flexGrow: 1,
//     width: "100%"
// }

// const messagesLayout = {
//     display: "flex",
//     flexFlow: "column",
//     flexGrow:1,
//     padding: "20px",
//     height: "100%"
// }

// const rightLayout = {
//     display: "flex",
//     flexFlow: "column",
//     minWidth: "260px",
//     height: "100%",
//     borderLeft: "2px solid rgb(47,52,63)"
// }

const topicsLayout = {
    display: "flex",
    flexFlow: "column",
    overflow: "auto",
    width: "100%",
    flex: 2,
    padding: "20px",
    boxShadow: "inset 0 0 3px rgb(30, 30, 30)"
    
}

const usersLayout = {
    display: "flex",
    flexFlow: "column",
    flex: 4,
    padding: "20px",
    overflow: "auto",
    borderTop: "2px solid rgb(47,52,63)", 
    boxShadow: "inset 0 0 3px rgb(30, 30, 30)",
    width: "100%",
}

// const inputLayout = {
//     height: "50px",
//     // padding: "10px",
//     width: "100%",
//     display: "flex",
//     background: "rgb(47,52,63)",
//     // borderTop: "1px solid #888888"
//     // background: "#888888",
//     // boxShadow: "0 0 4px black"
// }

const inputStyle = {
    color: "darkgray",
    width: "100%",
    // marginRight: "20px",
    // background: "#888888",
    // background: "rgb(47,52,63)",
    // background: "rgb(37,42,53)",
    background: "rgb(38,43,51)",
    // boxShadow: "inset 0 0 3px black",
    border: "none",
    outline: "none",
    padding: "10px",
    fontSize: "12px"
}

const buttonStyle = {
    // background: "#888888",
    // background: "rgb(97,102,113)",
    background: "gray",
    height: "100%",
    widht: "100%",
    // border: "4px solid rgb(47,52,63)",
    border: "none",
    outline: "none",
    padding: "10px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "rgb(28,33,41)"
}

const headerLayout = {
    // padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 20px 0 20px"
    // margin: "0"
}

const filterButtonContainer = {
    display: "flex"
}

const filterButtonStyle = {
    border: "none",
    boxShadow: "0 0 6px rgb(30,30,30)",
    background: "gray",
    color: "rgb(38,43,51)",
    marginLeft: "6px",
    padding: "3px 6px",
}


const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        messages: state.messages,
        userInfo: state.userInfo,
        users: state.users,
        topics: state.topics,
        subject: state.subject,
        signaledUsers: state.signaledUsers
    };
};


const mapActionsToDispatch = (dispatch) => {
    return bindActionCreators({
        setUsers,
        setTopics
    }, dispatch);
}

// export default Chat;
export default connect(mapStateToProps, mapActionsToDispatch)(Chat);