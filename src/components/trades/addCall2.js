import React from 'react';

import { connect } from 'react-redux';

import { CREATE_CALL } from '../../helpers/events.js';

class AddCall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // tradeCall: {
            //     ticker: '',
            //     status: '',
            //     openPrice: '',
            //     targetPrice: '',
            //     term: '',
            //     risk: '',
            //     exchange: '',
            //     note: '',
            // },
            ticker: '',
            status: 'open',
            openPrice: '',
            targetPrice: '',
            term: '',
            risk: '',
            exchange: '',
            note: '',
            // showForm: false
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // isValidInput() {
    //     const {tradeCall} = this.state;
    //     for (let key in tradeCall) {
    //         if (!tradeCall[key].trim()) {
    //             return false
    //         }
    //     }
    //     return true;
    // }

    isValidInput() {
        const {ticker, status, openPrice, targetPrice, term, risk, exchange, note} = this.state;
        if (ticker.trim() && 
            status && 
            openPrice.trim() && 
            targetPrice.trim() && 
            term.trim() &&
            risk.trim() &&
            exchange.trim() &&
            note.trim().length < 360) {
                return true;
        }
        return false;
    }

    onChange(e) {
        this.setState({
            [e.target.name]:  e.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const {ticker, status, openPrice, targetPrice, term, risk, exchange, note} = this.state;
        if (this.isValidInput()) {
            this.props.socket.emit(CREATE_CALL, 
            {
                ticker: ticker.toUpperCase(),
                status,
                openPrice,
                targetPrice,
                term,
                risk,
                exchange,
                note
            }, 
            (data) => {
                console.log(data);
                this.setState({
                    // showForm: false,
                    ticker: '',
                    status: 'open',
                    openPrice: '',
                    targetPrice: '',
                    term: '',
                    risk: '',
                    exchange: '',
                    note: '',
                });
            });
        } 
    }

    conditionalRender() {
        if (true) {
            return (
                <div style={compLayout}>
                    <h4 style={headingStyle}> Add Call </h4>
                    <form>
                        <div style={fieldGroup}>
                            <label style={textStyle}>Status</label>
                            {/* <input style={inputStyle} type="text" name="status" value={this.state.status} onChange={this.onChange}/> */}
                            <select value={this.state.value} name="status" onChange={this.onChange}>
                                <option>open</option>
                                <option>pending</option>
                                <option>closed</option>
                                <option>archived</option>
                            </select>
                        </div>
                        <div style={fieldGroup}>
                            <label style={textStyle}>Ticker</label>
                            <input style={inputStyle} type="text" name="ticker" value={this.state.ticker} onChange={this.onChange}/>
                        </div>
                        <div style={fieldGroup}>
                            <label style={textStyle}>Term</label>
                            <input style={inputStyle} type="text" name="term" value={this.state.term} onChange={this.onChange}/>
                        </div>
                        <div style={fieldGroup}>
                            <label style={textStyle}>Risk</label>
                            <input style={inputStyle} type="text" name="risk" value={this.state.risk} onChange={this.onChange}/>
                        </div>
                        <div style={fieldGroup}>
                            <label style={textStyle}>Open Price</label>
                            <input style={inputStyle} type="text" name="openPrice" value={this.state.openPrice} onChange={this.onChange}/>
                        </div>
                        <div style={fieldGroup}>
                            <label style={textStyle}>Target Price</label>
                            <input style={inputStyle} type="text" name="targetPrice" value={this.state.targetPrice} onChange={this.onChange}/>
                        </div>
                        <div style={fieldGroup}>
                            <label style={textStyle}>Exchange</label>
                            <input style={inputStyle} type="text" name="exchange" value={this.state.exchange} onChange={this.onChange}/>
                        </div>
                        <div style={fieldGroup}>
                            <label style={textStyle}>Note</label>
                            <input style={inputStyle} type="text" name="note" value={this.state.note} onChange={this.onChange}/>
                        </div>
                        <button style={buttonStyle} onClick={this.handleSubmit.bind(this)}>Submit</button>
                    </form>
                </div>
            );
        }
    }

    render() {
        return this.conditionalRender();
    }
}

const compLayout = {
    alignItems: "center",
    background: "rgba(47,52,63,0.4)",
    border: "3px dotted rgb(57,62,73)",
    display: "flex",
    flexFlow: "column",
    // justifyContent: "center",
    padding: "14px",
}

const fieldGroup = {
    marginBottom: "10px"
}

const inputStyle = {
    background: "#888888",
    border: "1px solid lightgray",
    outline: "none",
    color: "rgb(38,43,51)",
    fontSize: "14px",
    padding: "6px"
}

const headingStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "darkgray"
}

const buttonStyle = {
    background: "gray",
    color: "rgb(37,42,53)",
    fontWeight: "bold",
    padding: "10px"
}

const textStyle = {
    margin: "0 0",
    color: "gray",
    marginRight: "10px"
}

const mapStateToProps = (state) => {
    return {
        socket: state.socket
    };
};

export default connect(mapStateToProps, null)(AddCall);

