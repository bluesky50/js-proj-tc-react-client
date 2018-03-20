import React from 'react';

import { connect } from 'react-redux';

import { UPDATE_CALL } from '../../helpers/events.js';

class TradeCall extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showDetails: false,
            showNote: false,
        }

        this.toggleShowNote = this.toggleShowNote.bind(this);
        this.handleToggleDetails = this.handleToggleDetails.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleArchive = this.handleArchive.bind(this);
        this.handlePend = this.handlePend.bind(this);
    }

    handleToggleDetails() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    toggleShowNote() {
        this.setState({
            showNote: !this.state.showNote
        });
    }

    handleOpen() {
        const { socket, trade, userInfo } = this.props;
        if (userInfo.username === trade.creator) {
            socket.emit(UPDATE_CALL, ({ _id: trade._id, status: 'open' }));
        }
    }

    handleClose() {
        const { socket, trade, userInfo } = this.props;
        if (userInfo.username === trade.creator) {
            socket.emit(UPDATE_CALL, ({ _id: trade._id, status: 'closed' }));
        }
    }

    handleArchive() {
        const { socket, trade, userInfo } = this.props;
        if (userInfo.username === trade.creator) {
            socket.emit(UPDATE_CALL, ({ _id: trade._id, status: 'archive' }));
        }
    }

    handlePend() {
        const { socket, trade, userInfo } = this.props;
        if (userInfo.username === trade.creator) {
            socket.emit(UPDATE_CALL, ({ _id: trade._id, status: 'pending' }));
        }
    }

    tradeNote(note, color) {
        if (this.state.showNote) {
            return (
                <p style={{...textStyle, color}}>Note: {note}</p>
            );
        }
    }

    conditionalRender() {
        const { trade } = this.props;
        let style;
        let color;
        
        if (trade.status === 'open') {
            style = openTradeLayout;
            color = "#6ed179";
        } else if (trade.status === 'closed') {
            style = closedTradeLayout;
            color = "#e24b3d";
        } else if (trade.status === 'pending') {
            style = pendingTradeLayout;
            color = "#888888";
        } else {
            style = pendingTradeLayout;
            color = "#888888";
        }

        if (this.state.showDetails) {
            return (
                <div style={style}>
                    <div style={headingLayout}>
                        <p style={{...titleStyle, color}}>{trade.ticker}</p>
                        <div stlye={buttonContainer}>
                            <button style={{...buttonStyle, border: `1px solid ${color}`, color: color}} onClick={this.handlePend}>P</button>
                            <button style={{...buttonStyle, border: `1px solid ${color}`, color: color}} onClick={this.handleOpen}>O</button>
                            <button style={{...buttonStyle, border: `1px solid ${color}`, color: color}} onClick={this.handleClose}>C</button>
                            <button style={{...buttonStyle, border: `1px solid ${color}`, color: color}} onClick={this.handleArchive}>A</button>
                            <button style={{...buttonStyle, border: `1px solid ${color}`, color: color}} onClick={this.toggleShowNote}>N</button>
                            <button style={{...buttonStyle, border: `1px solid ${color}`, color: color}} onClick={this.handleToggleDetails}>-</button>
                        </div>
                    </div>
                    <p style={{...textStyle, color}}>Creator: {trade.creator}</p>
                    <p style={{...textStyle, color}}>Status: {trade.status}</p>
                    <p style={{...textStyle, color}}>Open Price: {trade.openPrice}</p>
                    <p style={{...textStyle, color}}>Target Price: {trade.targetPrice}</p>
                    <p style={{...textStyle, color}}>Term: {trade.term}</p>
                    <p style={{...textStyle, color}}>Risk: {trade.risk}</p>
                    <p style={{...textStyle, color}}>Exchange: {trade.exchange}</p>
                    {/* <p style={{...textStyle, color}}>Note: {trade.note}</p> */}
                    {this.tradeNote(trade.note, color)}
                </div>
            );
        } else {
            return (
                <div style={style}>
                    <div style={headingLayout}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <p style={{...titleStyle, color}}>{trade.ticker}</p>
                            <p style={{...textStyle, color, marginLeft: "8px"}}>({trade.creator})</p>
                        </div>
                        <button style={{...buttonStyle, border: `1px solid ${color}`, color: color}} onClick={this.handleToggleDetails.bind(this)}>+</button>
                    </div>
                    <p style={{...textStyle, color}}>R:{trade.risk} - D:{trade.term} - O:{trade.openPrice} - T:{trade.targetPrice} </p>
                </div>
            );
        }
    }

    render() {
        // console.log(this.props.trade);
        return this.conditionalRender();
    }
}


const openTradeLayout = {
    border: "1px solid #6ed179",
    // background: "rgba(110, 209, 121, 0.7)",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "inset 0 0 3px rgb(30,30,30)"
}

const closedTradeLayout = {
    border: "1px solid #e24b3d",
    // background: "rgba(226, 75, 61,0.7)",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "inset 0 0 3px rgb(30,30,30)"
}

const pendingTradeLayout = {
    border: "1px solid #888888",
    // background: "lightGray",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "inset 0 0 3px rgb(30,30,30)"
}

const headingLayout = {
    display: "flex",
    alignItems:"center",
    justifyContent: "space-between"
}

const buttonStyle = {
    background: "rgba(50, 50, 50, 0.7)",
    width: "20px",
    height: "20px",
    textAlign: "center",
    padding: "0",
    marginLeft: "4px"
}

const titleStyle = {
    margin: "0 0",
    color: "lightgray"
}

const textStyle = {
    margin: "0 0",
    fontSize: "12px",
    color: "lightgray"
}

const buttonContainer = {
    display: "flex"
}

const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, null)(TradeCall);