import React, { Component } from 'react';

const compLayout = {
    borderTop: "2px solid rgb(47,52,63)",
    padding: "20px",
    display: "flex",
    flexFlow: "column",
    flex: 1,
    boxShadow: "inset 0 0 3px rgb(30, 30, 30)",
}

const headerStyle = {
    // color: "rgb(67,72,83)",
    color: "rgb(97,102,113)",
    margin: "0 0"
}


class News extends Component {
    render () {
        return (
            <div style={compLayout}>
                <h4 style={headerStyle}>News</h4>
            </div>
        );
    }
}

export default News;