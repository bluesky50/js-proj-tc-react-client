import React from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MessagesList from './messagesList.js';

// import { addMessage, setMessages } from '../../reduxActions/messagesActions.js';
import { isValidString } from '../../helpers/validation.js';
import { setUsers } from '../../reduxActions/usersActions.js';
import { setTopics } from '../../reduxActions/topicsActions.js';

import { NEW_MESSAGE, CREATE_MESSAGE, CREATE_TOPIC } from '../../helpers/events.js';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const { socket } = this.props;
        if(isValidString(this.state.text) && socket) {
            socket.emit(CREATE_MESSAGE, { text: this.state.text }, function(data) {
                // console.log('created_message callback', data);
                console.log(data);
            });

            if (this.state.text.includes('#')) {
                const filteredStrings = this.state.text.split(' ').filter((str) => {
                    return str[0] ==='#';
                });
                filteredStrings.forEach((str) => {
                    socket.emit(CREATE_TOPIC, str.slice(1).toLowerCase(), function(data) {
                        console.log(data);
                    });
                });
            }

            this.setState({
                text: ''
            });
        }
    }

    mapUsers() {
        return this.props.users.map((u, index) => {
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
            return <p key={index} style={{color: "darkgray", fontSize: "14px", marginTop: "7px"}}><strong>{m.author}: </strong> {m.text}</p>
        });
    }

    // mapStuff() {
    //     const arr = [];
    //     for (let i = 0; i < 200; i++) {
    //         arr.push(<p key={i}>Something</p>);
    //     }
    //     return arr;
    // }

    render() {
        const {username, room} = this.props.userInfo;
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
                    <div style={{display: "flex", flexDirection:"column", flexGrow: 1}}>
                        <div style={{padding: "20px"}}>
                            <h4 style={headerStyle}>Chat</h4>
                        </div>
                        <div style={test1}>
                            {this.mapMessages()}
                        </div>
                    </div>
                    <form style={test2} onSubmit={this.onSubmit}>
                        <input name="text" onChange={this.onChange} style={inputStyle} value={this.state.text} type="text" placeholder="Type message here... #topic @user" autoFocus/>
                        <button style={buttonStyle} type="submit">Submit</button>
                        {/* <div style={{border: "1px solid rgb(27,32,43)", display: "flex"}}>
                            
                        </div>     */}
                    </form>
                </div>
                <div style={{width: "260px", height: "100%", display: "flex", flexDirection: "column", borderLeft: "2px solid rgb(47,52,63)"}}>
                    <div style={topicsLayout}>
                        <h4 style={headerStyle}>Topics</h4>
                        Topics #1a819b
                        rgb(193, 106, 177)
                        {this.mapTopics()}
                    </div>
                    <div style={usersLayout}>
                        <h4 style={headerStyle}>Users</h4>
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
    color: "rgb(97,102,113)",
    fontSize: "14px",
    margin: "6px 0 0 0"
}

const compLayout = {
    borderTop: "2px solid rgb(47,52,63)",
    // padding: "20px",
    display: "flex",
    flexGrow: 1,
    // height: "100%"
}

const headerStyle= {
    color: "rgb(97,102,113)",
    margin: "0 0"
}

const leftLayout = {
    display: "flex",
    height: "100%",
    flexFlow: "column",
    flexGrow: 1
}

const messagesLayout = {
    display: "flex",
    flexFlow: "column",
    flexGrow:1,
    padding: "20px",
    height: "100%"
}

const rightLayout = {
    display: "flex",
    flexFlow: "column",
    width: "260px",
    height: "100%",
    borderLeft: "2px solid rgb(47,52,63)"
}

const topicsLayout = {
    display: "flex",
    flexFlow: "column",
    overflow: "auto",
    flex: 2,
    padding: "20px",
}

const usersLayout = {
    display: "flex",
    flexFlow: "column",
    flex: 4,
    padding: "20px",
    overflow: "auto",
    borderTop: "2px solid rgb(47,52,63)"
}

const inputLayout = {
    height: "50px",
    // padding: "10px",
    width: "100%",
    display: "flex",
    background: "rgb(47,52,63)",
    // borderTop: "1px solid #888888"
    // background: "#888888",
    // boxShadow: "0 0 4px black"
}

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
    background: "rgb(97,102,113)",
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

const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        messages: state.messages,
        userInfo: state.userInfo,
        users: state.users,
        topics: state.topics
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