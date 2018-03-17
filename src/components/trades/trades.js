import React, { Component } from 'react';

import TradeCall from './item.js';
import AddTrade from './addTrade.js';

const compLayout = {
    borderTop: "2px solid rgb(47,52,63)",
    padding: "20px",
    display: "flex",
    flexFlow: "column",
    flex: 3,
    overflow: "auto"
}

const headerLayout = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}

const headerStyle = {
    // color: "rgb(67,72,83)",
    color: "rgb(97,102,113)",
    margin: "0 0"
}

class Trades extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tradeCalls: [{
                ticker: 'VEN/BTC',
                status: 'open',
                openPrice: '8500 sat',
                targetPrice: '9000 sat',
                term: 'Short Term',
                risk: 'Intermediate',
                exchange: 'Binance',
                note: 'Looking for 5% gain, but will close if changes direction.'
            }, {
                ticker: 'EOS/BTC',
                status: 'open',
                openPrice: '8500 sat',
                targetPrice: '9000 sat',
                term: 'Mid Term',
                risk: 'Intermediate',
                exchange: 'Binance',
                note: 'Looking for 5% gain, but will close if changes direction.'
            }, {
                ticker: 'ICX/BTC',
                status: 'closed',
                openPrice: '8500 sat',
                targetPrice: '9000 sat',
                term: 'Short Term',
                risk: 'High',
                exchange: 'Binance',
                note: 'Looking for 5% gain, but will close if changes direction.'
            }, {
                ticker: 'LTC/BTC',
                status: 'pending',
                openPrice: '8500 sat',
                targetPrice: '9000 sat',
                term: 'Short Term',
                risk: 'Intermediate Risk',
                exchange: 'Binance',
                note: 'Looking for 5% gain, but will close if changes direction.'
            }],
            filter: '',
        }
    }

    filterTradeCalls() {
        if (this.state.filter) {
            return this.state.tradeCalls.filter((tc) => {
                return tc.status === this.state.filter;
            });
        }
        return this.state.tradeCalls;
    }

    setFilterOpen() {
        this.setState({
            filter: 'open'
        });
    }

    setFilterPending() {
        this.setState({
            filter: 'pending'
        });
    }

    setFilterAll() {
        this.setState({
            filter: ''
        });
    }

    mapTradeCalls() {
        return this.filterTradeCalls().map((t,index) => {
            return (<TradeCall key={index} trade={t}/>);
        });
    }

    render () {
        return (
            <div style={compLayout}>
                <div style={headerLayout}>
                    <h4 style={headerStyle}>Trades</h4>
                    <div>
                        <button onClick={this.setFilterOpen.bind(this)}>O</button>
                        <button onClick={this.setFilterPending.bind(this)}>P</button>
                        <button onClick={this.setFilterAll.bind(this)}>A</button>
                    </div>
                </div>
                {this.mapTradeCalls()}
                <AddTrade/>
            </div>
        );
    }
}

export default Trades;