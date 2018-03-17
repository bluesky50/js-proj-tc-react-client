import React from 'react';

const compLayout = {
    display: "flex",
    flexFlow: "column",
    // border: "2px solid #888888",
    border: "3px dotted rgb(57,62,73)",
    background: "rgba(47,52,63,0.4)",
    // background: "lightGray",
    padding: "10px"
}

const addTradeButtonLayout = {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "3px dotted rgb(57,62,73)",
    background: "rgba(47,52,63,0.4)",
    padding: "14px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "darkgray"
}

const textStyle = {
    margin: "0 0",
    lineHeight: 1
}

class AddTrade extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tradeCall: {
                ticker: '',
                status: '',
                openPrice: '',
                targetPrice: '',
                term: '',
                risk: '',
                exchange: '',
                note: '',
            },
            showForm: false
        }
    }

    handleAddTrade() {
        this.setState({
            showForm: true
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            showForm: false
        });
    }

    conditionalRender() {
        if (this.state.showForm) {
            return (
                <div style={compLayout}>
                    <form>
                        <div>
                            <label>Ticker</label>
                            <input type="text" name="ticker" value={this.state.tradeCall.ticker}/>
                        </div>
                        <div>
                            <label>Status</label>
                            <input type="text" name="status" value={this.state.tradeCall.status}/>
                        </div>
                        <div>
                            <label>Term</label>
                            <input type="text" name="term" value={this.state.tradeCall.term}/>
                        </div>
                        <div>
                            <label>Risk</label>
                            <input type="text" name="risk" value={this.state.tradeCall.risk}/>
                        </div>
                        <div>
                            <label>Open Price</label>
                            <input type="text" name="openPrice" value={this.state.tradeCall.openPrice}/>
                        </div>
                        <div>
                            <label>Target Price</label>
                            <input type="text" name="targetPrice" value={this.state.tradeCall.targetPrice}/>
                        </div>
                        <div>
                            <label>Exchange</label>
                            <input type="text" name="targetPrice" value={this.state.tradeCall.exchange}/>
                        </div>
                        <div>
                            <label>Note</label>
                            <input type="text" name="targetPrice" value={this.state.tradeCall.note}/>
                        </div>
                        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <button style={addTradeButtonLayout} onClick={this.handleAddTrade.bind(this)}>
                    Add Trade
                    {/* <p style={textStyle}>Add Trade</p> */}
                    {/* <button onClick={this.handleAddTrade.bind(this)}>Add Trade</button> */}
                </button>
            );
        }
    }

    render() {
        return this.conditionalRender();
    }
}

export default AddTrade;