import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TradeCall from './item.js';
import AddCall from './addCall2.js';
import FlipMove from 'react-flip-move';

import { setCalls } from '../../reduxActions/callsActions.js';

class Trades extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // tradeCalls: [{
            //     ticker: 'VEN/BTC',
            //     status: 'open',
            //     openPrice: '8500 sat',
            //     targetPrice: '9000 sat',
            //     term: 'Short Term',
            //     risk: 'Intermediate',
            //     exchange: 'Binance',
            //     note: 'Looking for 5% gain, but will close if changes direction.'
            // }, {
            //     ticker: 'EOS/BTC',
            //     status: 'open',
            //     openPrice: '8500 sat',
            //     targetPrice: '9000 sat',
            //     term: 'Mid Term',
            //     risk: 'Intermediate',
            //     exchange: 'Binance',
            //     note: 'Looking for 5% gain, but will close if changes direction.'
            // }, {
            //     ticker: 'ICX/BTC',
            //     status: 'closed',
            //     openPrice: '8500 sat',
            //     targetPrice: '9000 sat',
            //     term: 'Short Term',
            //     risk: 'High',
            //     exchange: 'Binance',
            //     note: 'Looking for 5% gain, but will close if changes direction.'
            // }, {
            //     ticker: 'LTC/BTC',
            //     status: 'pending',
            //     openPrice: '8500 sat',
            //     targetPrice: '9000 sat',
            //     term: 'Short Term',
            //     risk: 'Intermediate Risk',
            //     exchange: 'Binance',
            //     note: 'Looking for 5% gain, but will close if changes direction.'
            // }],
            filter: '',
            showAddCall: false,
            search: ''
        }
    }

    toggleShowAddCall() {
        this.setState({
            showAddCall: !this.state.showAddCall
        })
    }

    filterTradeCalls() {
        // if (this.state.filter) {
        //     return this.state.tradeCalls.filter((tc) => {
        //         return tc.status === this.state.filter;
        //     });
        // }
        // return this.state.tradeCalls;
        // console.log(this.props.calls);

        let result = this.props.calls; 
        if (this.state.search) {
            result = this.props.calls.filter((tc) => {
                if (tc.ticker.includes(this.state.search.toUpperCase())) {
                    return true;
                }

                if (tc.creator.toLowerCase().includes(this.state.search.toLowerCase())) {
                    return true;
                }

                if (tc.risk.toLowerCase().includes(this.state.search.toLowerCase())) {
                    return true;
                }

                if (tc.term.toLowerCase().includes(this.state.search.toLowerCase())) {
                    return true;
                }

                return false
            });
        }
       
        if (this.state.filter) {

            if (this.state.filter === 'me') {
                return result.filter((tc) => {
                    return tc.creator === this.props.userInfo.username;
                });
            } else {
                return result.filter((tc) => {
                    return tc.status === this.state.filter;
                });
            }
        }

        return result;
    }

    setFilterOpen() {
        this.setState({
            filter: 'open',
            showAddCall: false
        });
    }

    setFilterPending() {
        this.setState({
            filter: 'pending',
            showAddCall: false
        });
    }

    setFilterAll() {
        this.setState({
            filter: '',
            showAddCall: false
        });
    }

    setFilterMe() {
        this.setState({
            filter: 'me',
            showAddCall: false
        });
    }

    mapTradeCalls() {
        return this.filterTradeCalls().map((t) => {
            // console.log(t);
            return (<TradeCall key={t._id} trade={t}/>);
        });
    }

    onChange(e) {
        this.setState({
            search: e.target.value
        });
    }

    conditionalRender() {
        if (this.state.showAddCall) {
            return (
                <AddCall/>
            );
        } else {
            return this.mapTradeCalls();
        }
    }

    render () {
        return (
            <div style={compLayout}>
                <div style={headerLayout}>
                    <h4 style={headerStyle}>Calls</h4>
                    <div style={filterButtonContainer}>
                        <input style={{ outline: "none" }} value={this.state.search} placeholder="Search" onChange={this.onChange.bind(this)}/>
                        <button style={filterButtonStyle} onClick={this.toggleShowAddCall.bind(this)}>N</button>
                        <button style={filterButtonStyle} onClick={this.setFilterOpen.bind(this)}>O</button>
                        <button style={filterButtonStyle} onClick={this.setFilterPending.bind(this)}>P</button>
                        <button style={filterButtonStyle} onClick={this.setFilterMe.bind(this)}>M</button>
                        <button style={filterButtonStyle} onClick={this.setFilterAll.bind(this)}>A</button>
                    </div>
                </div>
                <FlipMove maintainContainerHeight={true} easing="ease-in-out">
                    {this.conditionalRender()}
                </FlipMove>
            </div>
        );
    }
}
const filterButtonContainer = {
    display: "flex"
}

const filterButtonStyle = {
    border: "none",
    boxShadow: "0 0 6px rgb(30,30,30)",
    background: "gray",
    color: "rgb(38,43,51)",
    marginLeft: "6px",
    padding: "3px 6px",
}

const compLayout = {
    borderTop: "2px solid rgb(47,52,63)",
    boxShadow: "inset 0 0 3px rgb(30, 30, 30)",
    padding: "20px",
    display: "flex",
    flexFlow: "column",
    flex: 3,
    overflow: "auto"
}

const headerLayout = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px"
}

const headerStyle = {
    // color: "rgb(67,72,83)",
    color: "rgb(97,102,113)",
    margin: "0 0"
}


const mapStateToProps = (state) => {
    return {
        calls: state.calls,
        userInfo: state.userInfo
    };
};

const mapActionsToDispatch = (dispatch) => {
    return bindActionCreators({
        setCalls
    }, dispatch);
}

export default connect(mapStateToProps, mapActionsToDispatch)(Trades);