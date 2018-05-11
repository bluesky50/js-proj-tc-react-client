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
import { addMessage } from '../reduxActions/messagesActions.js';
import { setUsers } from '../reduxActions/usersActions.js';
import { setTopics } from '../reduxActions/topicsActions.js';
import { setCalls, addCall, removeCall, updateCall } from '../reduxActions/callsActions.js';
import { setSubject } from '../reduxActions/subjectActions.js';
import { setSignaledUsers, addSignaledUser, removeSignaledUser } from '../reduxActions/signaledUsersActions.js';
import { addAnnouncement } from '../reduxActions/announcementsActions.js';

import {
    // USER_CONNECTED,
    // USER_DISCONNECTED,
    JOIN_CHANNEL,
    UPDATE_USER_LIST,

    NEW_MESSAGE,
    // CREATE_MESSAGE,

    UPDATE_TOPIC_LIST,
    // ADD_TOPIC,
    // ADD_TOPIC_VOTE,
    // REMOVE_TOPIC_VOTE,

    UPDATE_SUBJECT,

    UPDATE_SIGNALED_LIST,

    UPDATE_CALL_LIST,
    NEW_CALL,
    REMOVE_CALL,
    UPDATE_CALL,

    NEW_ANN
} from '../helpers/events.js';
import { ADD_SIGNALED_USER, REMOVE_SIGNALED_USER } from '../reduxTypes/signaledUsersTypes.js';

class DashPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socketConnected: false,
            showHelpModal: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillMount() {
        this.initSocket();
    }

    initSocket() {
        if (!this.props.socket && this.props.userInfo) {
            const socket = io(DEV_SERVER_URI);

            socket.on('connect', () => {
        
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
            });

            socket.on(UPDATE_CALL_LIST, (callList) => {
                this.props.setCalls(callList);
            });

            socket.on(NEW_CALL, (callObj) => {
                this.props.addCall(callObj);
            });

            socket.on(REMOVE_CALL, (callId) => {
                this.props.removeCall(callId);
            });

            // Reducer and actions not implemented yet.
            socket.on(UPDATE_CALL, (callObj) => {
                this.props.updateCall(callObj);
            });

            socket.on(UPDATE_SUBJECT, (subjectStr) => {
                this.props.setSubject(subjectStr);
            });

            socket.on(UPDATE_SIGNALED_LIST, (signaledList) => {
                this.props.setSignaledUsers(signaledList);
            });

            socket.on(ADD_SIGNALED_USER, (username) => {
                this.props.addSignaledUser(username);
            });

            socket.on(REMOVE_SIGNALED_USER, (username) => {
                this.props.removeSignaledUser(username);
            });

            socket.on(NEW_ANN, (annStr) => {
                this.props.addAnnouncement(annStr);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected from the server.');
            });

            this.props.setSocket(socket);
        }
    }

    
    // mapStuff() {
    //     const arr = [];
    //     for (let i = 0; i < 200; i++) {
    //         arr.push(<p key={i}>Something</p>);
    //     }
    //     return arr;
    // }

    toggleModal() {
        this.setState({
            showHelpModal: !this.state.showHelpModal
        });
    }

    helpModal() {
        if (this.state.showHelpModal) {
            return (
                <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center", background: "rgba(100,100,100,0.3)", zIndex: 100, position: "fixed", top: "0", left: "0"}}>
                    <div style={{display: "flex", justifyContent: "space-around", height: "44%", width: "64%"}}>
                        <div style={helpModalContainer}>
                            <h3 style={helpModalHeaderTextStyle}>App Description</h3>
                            <h4 style={helpModalHeaderTextStyle}>Overview</h4>
                            <p style={helpModalTextStyle}>The web app aims to be a chat space for users to share their trades and talk about the crypto space.</p>
                            <h4 style={helpModalHeaderTextStyle}>Details</h4>
                            <p style={helpModalTextStyle}>Chat:M = My messages.</p>
                            <p style={helpModalTextStyle}>Chat:Q = Questions.</p>
                            <p style={helpModalTextStyle}>Chat:T = Topic Messages.</p>
                            <p style={helpModalTextStyle}>Chat:A = All Messages.</p>
                            <p style={helpModalTextStyle}>Trades:+ = Create call.</p>
                            <p style={helpModalTextStyle}>Trades:O = Open calls.</p>
                            <p style={helpModalTextStyle}>Trades:A = All calls.</p>
                            <p style={helpModalTextStyle}>Trades:P = Pending calls.</p>
                            <p style={helpModalTextStyle}>Trades:C = Closed calls.</p>
                            <p style={helpModalTextStyle}>Call:O = Open call.</p>
                            <p style={helpModalTextStyle}>Call:C = Close call.</p>
                            <p style={helpModalTextStyle}>Call:A = Archive calls.</p>
                            <p style={helpModalTextStyle}>Call:N = Show call note.</p>
                        </div>
                        <div style={helpModalContainer}>
                            <h3 style={helpModalHeaderTextStyle}>Feature Testing</h3>
                            <h4 style={helpModalHeaderTextStyle}>Trade Calls</h4>
                            <p style={helpModalTextStyle}>- Create trade calls</p>
                            <p style={helpModalTextStyle}>- Filter trade calls by open, pending, all</p>
                            <p style={helpModalTextStyle}>- Edit trade calls</p>
                            <p style={helpModalTextStyle}>- Archive trade calls</p>
                            <h4 style={helpModalHeaderTextStyle}>Chat</h4>
                            <p style={helpModalTextStyle}>- Send messages</p>
                            <p style={helpModalTextStyle}>- Mention a topic using # symbol</p>
                            <p style={helpModalTextStyle}>- Mention a user using @ symbol</p>
                            <p style={helpModalTextStyle}>- Filter messages by user or topic</p>
                        </div>
                        <div style={helpModalContainer}>
                            <h3 style={helpModalHeaderTextStyle}>Feedback Requests</h3>
                            <h4 style={helpModalHeaderTextStyle}>UI/UX</h4>
                            <p style={helpModalTextStyle}>- Text Styles</p>
                            <p style={helpModalTextStyle}>- Text Sizes</p>
                            <p style={helpModalTextStyle}>- Area padding and margins</p>
                            <p style={helpModalTextStyle}>- Spacing and structure</p>
                            <h4 style={helpModalHeaderTextStyle}>Functionality</h4>
                            <p style={helpModalTextStyle}>- Is there anything that isn't working?</p>
                            <p style={helpModalTextStyle}>- Additiona ideas?</p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        
        let pls;

        if (this.state.showHelpModal) {
            pls = {...pageLayout, filter: "blur(4px)"};
        } else {
            pls = pageLayout;
        }
        
        return (
            <div style={pageLayout}>
                {/* <div style={{ top: "0", left: "0", position: "fixed", height: "100vh", width: "100%", filter: "blur(5px)", zIndex: "100", background: "rgb(50, 50,50)"}}>OVERLAY</div> */}
                {this.helpModal()}
                <button onClick={this.toggleModal} style={{ border: "none", background: "gray", width: "40px", padding: "10px", color: "rgb(47,52,63)", fontSize: "14px", fontWeight: "bold", position: "fixed", bottom: "10px", right: "10px", zIndex: "200", boxShadow: "0 0 6px rgb(30, 30, 30)",}}>?</button>
                <div style={pls}>
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

// const test1 = {
//     flexGrow: 1,
//     overflowY: "auto"
//     // -webkit-overflow-scrolling: touch;
// }

const helpModalContainer = {
    border: "1px solid lightgray", 
    background: "rgb(50,50,50, 0.5)",
    boxShadow: "inset 0 0 4px rgb(30, 30, 30)",
    display: "flex", 
    flexDirection: "column", 
    width: "280px", 
    overflow: "auto", 
    padding: "10px", 
    margin: "10px"
};

const helpModalTextStyle = {
    // color: "rgb(157,162,173)",
    color: "rgb(122,127,138)",
    // textShadow: "0 0 1px white",
    margin: "4px 0",
    fontSize: "14px"
}

const helpModalHeaderTextStyle = {
    // color: "rgb(117,122,133)",
    color: "rgb(157,162,173)",
    // color: "lightgray",
    margin: "6px 0"
}

// const test2 = {
//     background: "#e6eaee",
//     display: "flex",
//     padding: "10px",
//     /*height: 60px;*/
//     flexShrink: 0
// }

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
        
        setTopics,

        setCalls,
        addCall,
        removeCall,
        updateCall,

        setSubject,

        setSignaledUsers,
        addSignaledUser,
        removeSignaledUser,

        addAnnouncement

    }, dispatch);
}

// export default DashPage;
export default connect(mapStateToProps, mapActionsToDispatch)(DashPage);