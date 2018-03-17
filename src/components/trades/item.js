import React from 'react';

const openTradeLayout = {
    border: "1px solid #6ed179",
    // background: "rgba(110, 209, 121, 0.7)",
    padding: "10px",
    marginBottom: "10px"
}

const closedTradeLayout = {
    border: "1px solid #e24b3d",
    // background: "rgba(226, 75, 61,0.7)",
    padding: "10px",
    marginBottom: "10px"
}

const pendingTradeLayout = {
    border: "1px solid #888888",
    // background: "lightGray",
    padding: "10px",
    marginBottom: "10px"
}

const headingLayout = {
    display: "flex",
    alignItems:"center",
    justifyContent: "space-between"
}

const buttonStyle = {
    background: "rgba(50, 50, 50, 0.7)"
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

class TradeCall extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showDetails: false
        }
    }

    handleToggleDetails() {
        this.setState({
            showDetails: !this.state.showDetails
        });
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
                        <button style={buttonStyle} onClick={this.handleToggleDetails.bind(this)}>D</button>
                    </div>
                    <p style={{...textStyle, color}}>status: {trade.status}</p>
                    <p style={{...textStyle, color}}>Open Price: {trade.openPrice}</p>
                    <p style={{...textStyle, color}}>Target Price: {trade.targetPrice}</p>
                    <p style={{...textStyle, color}}>Term: {trade.term}</p>
                    <p style={{...textStyle, color}}>Risk: {trade.risk}</p>
                    <p style={{...textStyle, color}}>Exchange: {trade.exchange}</p>
                    <p style={{...textStyle, color}}>Note: {trade.note}</p>
                </div>
            );
        } else {
            return (
                <div style={style}>
                    <div style={headingLayout}>
                        <p style={{...titleStyle, color}}>{trade.ticker}</p>
                        <button style={buttonStyle} onClick={this.handleToggleDetails.bind(this)}>D</button>
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

export default TradeCall;