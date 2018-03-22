import React, { Component } from 'react';
import moment from 'moment';

import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

class Announcements extends Component {

    mapAnnouncements() {
        return this.props.announcements.map((a, index) => {
            return (
                <div style={annContainer}>
                    <p style={textStyle} key={index}>{a.text}</p>
                    <p style={timeTextStyle}>[ {moment(a.createdAt).format('h:mm a')} ]</p> 
                </div>
            );
        });
    }

    render () {
        return (
            <div style={compLayout}>
                <h4 style={headerStyle}>Announcements</h4>
                {this.mapAnnouncements()}
            </div>
        );
    }
}

const compLayout = {
    borderTop: "1px solid rgb(47,52,63)",
    boxShadow: "inset 0 0 3px rgb(30, 30, 30)",
    padding: "20px",
    display: "flex",
    flexFlow: "column",
    // flex: 1
    height: "200px"
}

const annContainer = {
    display: "flex"
}

const headerStyle = {
    // color: "rgb(67,72,83)",
    color: "rgb(97,102,113)",
    margin: "0 0 6px 0"
}

const textStyle = {
    // color: "rgb(127,132,143)",
    color: "darkgray",
    fontSize: "14px",
    margin: "0 0 4px 0"
}

const timeTextStyle = {
    color: "rgb(97,102,113)",
    fontSize: "12px",
    margin: "0 0 0 4px"
}

const mapStateToProps = (state) => {
    return {
        announcements: state.announcements
    };
}

export default connect(mapStateToProps, null)(Announcements);