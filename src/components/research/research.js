import React from 'react';

class Research extends React.Component {
    render() {
        return (
            <div style={macroLayout}>
                <div style={leftLayout}>
                    <h4 style={headerStyle}>Research</h4>
                </div>
                <div style={rightLayout}>
                    <h4 style={headerStyle}>Resources</h4>
                    <a style={linkStyle} target="_blank" href="https://blockchain.info/markets">blockchain.info/markets</a>
                    <a style={linkStyle} target="_blank" href="https://www.blockchaincurated.com/">blockchaincurrated.com</a>
                    
                    <a style={linkStyle} target="_blank" href="https://cryptobriefing.com/">cryptobriefing.com</a>
                    <a style={linkStyle} target="_blank" href="https://bravenewcoin.com/markets">bravenewcoin.com/markets</a>
                    <a style={linkStyle} target="_blank" href="https://cointelegraph.com/">cointelegraph.com</a>
                    <a style={linkStyle} target="_blank" href="https://dashboard.cryptoparse.io/#/">cryptoparse.io</a>
                    <a style={linkStyle} target="_blank" href="https://cointrendz.com/">cointrendz.com</a>
                    <a style={linkStyle} target="_blank" href="https://coinmarketcap.com/">coinmarketcap.com</a>
                    
                    <a style={linkStyle} target="_blank" href="https://coinmeme.io/">coinmeme.io</a>
                </div>
            </div>
        );
    }
}

const macroLayout = {
    display: "flex",
    // flex: 1
    height: "200px"
}

const leftLayout = {
    borderTop: "1px solid rgb(47,52,63)",
    boxShadow: "inset 0 0 3px rgb(30, 30, 30)",
    padding: "20px",
    display: "flex",
    flexFlow: "column",
    flex: 4
}

const rightLayout = {
    borderLeft: "2px solid rgb(47,52,63)",
    boxShadow: "inset 0 0 3px rgb(30, 30, 30)",
    padding: "20px",
    display: "flex",
    flexFlow: "column",
    // flex: 2,
    width: "260px"
}

const headerStyle = {
    // color: "rgb(67,72,83)",
    color: "rgb(97,102,113)",
    margin: "0 0"
}

const linkStyle = {
    color: "rgb(60, 101, 142)",
    fontSize: "12px",
    marginBottom: "2px"
}


export default Research;