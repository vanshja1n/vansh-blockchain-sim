import React, { Component } from 'react';
import Loader from './Loader';
import HashDisplay from './HashDisplay';

class MyWallet extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            publicKey: null,
            blockchain: null,
            balance: null,
        }
    }

    componentWillMount() {
        this.setState({
            blockchain: this.props.blockchain,
            publicKey: this.props.publicKey,
            balance: this.props.blockchain.getBalance(this.props.publicKey, this.props.balance[0]),
            loading: false,
        })
    }

    render() {
        if(this.state.loading === false){
            return(
                <div className="page-container">
                    <div className="page-header">
                        <h1>👛 My <span className="accent-text">Wallet</span></h1>
                        <p>Your personal wallet overview and account details</p>
                    </div>
                    <div className="wallet-hero">
                        <div className="wallet-balance-label">Total Balance</div>
                        <div className="wallet-balance-value">{this.state.balance}</div>
                        <div className="wallet-balance-currency">Kryptos (KPT)</div>
                        
                        <div className="wallet-stats">
                            <div className="wallet-stat-card">
                                <div className="stat-label">Network</div>
                                <div className="stat-value" style={{color: '#10b981'}}>Mainnet</div>
                            </div>
                            <div className="wallet-stat-card">
                                <div className="stat-label">Chain Length</div>
                                <div className="stat-value">{this.state.blockchain.chain.length}</div>
                            </div>
                            <div className="wallet-stat-card">
                                <div className="stat-label">Mining Reward</div>
                                <div className="stat-value" style={{color: '#f59e0b'}}>{this.state.blockchain.miningReward}</div>
                            </div>
                        </div>

                        <div className="wallet-address-section">
                            <div className="wallet-address-label">🔑 Your Public Key</div>
                            <div className="wallet-address">
                                <HashDisplay hash={this.state.publicKey} isAddress={true} copyFull={true} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <Loader></Loader>
            )
        }
    }
}

export default MyWallet;
