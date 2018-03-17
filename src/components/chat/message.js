import React from 'react';

class MessageItem extends React.Component {
    render() {
        const { message } = this.props;
        return(
            <div style={compLayout}>
                {/* {this.props.last ? <p style={recentMessageStyle}>></p> : null} */}
                <p style={userTextStyle}> {message.author}</p>
                <p style={messageTextStyle}>{message.text}</p>
            </div>
        );
    }
}

const compLayout = {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    // padding: "14px",
    margin: "2px 0",
}

const userTextStyle = {
    fontSize: "12px",
    fontWeight: "bold",
    margin: "0 10px 0 0",
    // color : "#888888",
    color: "lightgray"
}

const messageTextStyle = {
    fontSize: "12px",
    color : "#888888",
    color: "lightgray",
    margin: "0 10px 0 0",
}

const recentMessageStyle = {
    fontSize: "12",
    color: "white",
    margin: "10px"
}

export default MessageItem;