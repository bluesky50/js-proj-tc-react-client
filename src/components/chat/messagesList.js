import React from 'react';
import { connect } from 'react-redux'; 

import MessageItem from './message.js';

class MessagesList extends React.Component {
    mapElements() {
        return this.props.messages.map((m,index) => {
            return <MessageItem key={index} message={m} last={this.props.messages.length-1 === index}/>;
        });
    }
    
    render() {
        return (
            <div style={compLayout}>
                MessagesList
                {this.mapElements()}
            </div>
        );
    }
}

const compLayout = {
    display: "flex",
    flexFlow: "column",
    // padding: "14px",
    overflowY: "auto",
    // "-webkit-overflow-scrolling": "touch",
    height: "20vh"
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps, null)(MessagesList);