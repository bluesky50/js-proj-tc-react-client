import React, { Component } from 'react';

const compLayout = {
    borderTop: "1px solid rgb(47,52,63)",
    padding: "20px",
    display: "flex",
    flexFlow: "column",
    // flex: 1
    height: "200px"
}

const headerStyle = {
    // color: "rgb(67,72,83)",
    color: "rgb(97,102,113)",
    margin: "0 0"
}


class Announcements extends Component {
    render () {
        return (
            <div style={compLayout}>
                <h4 style={headerStyle}>Announcements</h4>
            </div>
        );
    }
}

export default Announcements;