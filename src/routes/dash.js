import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Announcements from '../components/announcements/announcements.js';
import Trades from '../components/trades/trades.js';
import News from '../components/news/news.js';
import Research from '../components/research/research.js';
import Chat from '../components/chat/chat.js';

import { DEV_SERVER_URI } from '../helpers/connections.js';

import { setSocket } from '../reduxActions/socketActions.js';
import { addMessage, setMessages } from '../reduxActions/messagesActions.js';
import { setUsers } from '../reduxActions/usersActions.js';
import { setTopics } from '../reduxActions/topicsActions.js';

import {
    USER_CONNECTED,
    USER_DISCONNECTED,
    NEW_MESSAGE,
    CREATE_MESSAGE,
    // NEW_TRADE,
    // CREATE_TRADE,
    // UPDATE_TRADE,
    UPDATE_TOPIC_LIST,
    ADD_TOPIC,
    ADD_TOPIC_VOTE,
    REMOVE_TOPIC_VOTE,
    JOIN_CHANNEL,
    UPDATE_USER_LIST
} from '../helpers/events.js';

class DashPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socketConnected: false
        }
    }

    componentWillMount() {
        this.initSocket();
    }

    initSocket() {
        if (!this.props.socket && this.props.userInfo) {
            const socket = io(DEV_SERVER_URI);

            socket.on('connect', () => {
                // console.log('Client connected');
                // console.log(this.props.userInfo);
                socket.emit(JOIN_CHANNEL, this.props.userInfo, (err) => {
                    if (err) {
                        console.log('Error joining room.');
                        // Handle this some how, maybe push the user back to login?
                    } else {
                        console.log(`${this.props.userInfo.username} succesfully joined ${this.props.userInfo.room}.`);
                    }
                    
                });
            });

            socket.on(NEW_MESSAGE, (message) => {
                this.props.addMessage(message);
            });

            socket.on(UPDATE_USER_LIST, (userList) => {
                //TODO: Need to create actions to handle this.
                this.props.setUsers(userList);
            });

            socket.on(UPDATE_TOPIC_LIST, (topicList) => {
                this.props.setTopics(topicList);
            })

            socket.on('disconnect', () => {
                console.log('Client disconnected from the server.');
            });

            this.props.setSocket(socket);
        }
    }

    mapStuff() {
        const arr = [];
        for (let i = 0; i < 200; i++) {
            arr.push(<p key={i}>Something</p>);
        }
        return arr;
    }

    render() {
      return (
        <div style={pageLayout}>
            <div style={sidebar}></div>
            <div style={leftCol}>
                <Announcements/>
                <Trades/>
                <News/>
            </div>
            <div style={rightCol}>
                <Research/>
     

                <Chat/>
                {/* <div style={{height: "200px", background: "lightgray"}}>

                </div> */}
                {/* <div style={{display: "flex", height: "100%"}}>
                    <div style={{display: "flex", flexDirection: "column", flexGrow: 1, height: "100%"}}>
                            <div style={{display: "flex", flexDirection:"column", flexGrow: 1}}>
                                Messages
                                <div style={test1}>
                                    {this.mapStuff()}
                                </div>
                            </div>
                            <div style={test2}> 
                                footer
                            </div>
                        </div>
                    <div style={{width: "200px", height: "100%", display: "flex", flexDirection: "column"}}>
                        
                    </div>
                </div> */}
            </div>
            
        </div>
      );
    }
}

const pageLayout = {
    height: "100vh",
    width: "100%",
    background: "rgb(38,43,51)", // 47,52,63, 204,204, 200
    display: "flex",
    // flexDirection: "column"
}

const test1 = {
    flexGrow: 1,
    overflowY: "auto"
    // -webkit-overflow-scrolling: touch;
}

const test2 = {
    background: "#e6eaee",
    display: "flex",
    padding: "10px",
    /*height: 60px;*/
    flexShrink: 0
}

const sidebar = {
    background: "rgb(47,52,63)",
    display: "flex",
    flexFlow: "column",
    height: "100vh",
    width: "40px",
    // position: "fixed", 
    top: "0",
    left: "0",
    padding: "14px"
};

const leftCol = {
    display:"flex",
    flexFlow: "column",
    border: "1px solid rgb(47,52,63)",
    // padding: "14px",
    minWidth: "400px",
    height: "100vh"
};

const rightCol = {
    display:"flex",
    flexDirection: "column",
    border: "1px solid rgb(47,52,63)",
    // padding: "14px",
    width: "100%",
    height: "100vh",
}

const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        userInfo: state.userInfo,
    }
}

const mapActionsToDispatch = (dispatch) => {
    return bindActionCreators({
        setSocket,
        setUsers,
        addMessage,
        setTopics
    }, dispatch);
}

// export default DashPage;
export default connect(mapStateToProps, mapActionsToDispatch)(DashPage);