import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import HashDisplay from './HashDisplay';
import '../index.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            chain: null,
            balance: 0,
            pendingTxnsLength: 0,
        }
    }

    componentDidMount(){
        let balance = 0;
        if (this.props.publicKey) {
             const startBal = Array.isArray(this.props.balance) ? this.props.balance[0] : (this.props.balance || 0);
             balance = this.props.blockchain.getBalance(this.props.publicKey, startBal);
        }

        this.setState({
            loading: false,
            chain: this.props.blockchain.chain,
            balance: balance,
            pendingTxnsLength: this.props.blockchain.getPendingTxns().length,
        })
    }

    render() {
        if(this.state.loading === false){
            
            let totalTxns = 0;
            let circulatingSupply = 0;
            let totalMiningTime = 0;
            let blocksWithTime = 0;

            this.state.chain.forEach(block => {
                totalTxns += Array.isArray(block.transactions) ? block.transactions.length : 0;
                
                if (Array.isArray(block.transactions)) {
                    block.transactions.forEach(tx => {
                        if (tx.from === null) {
                            circulatingSupply += tx.amount;
                        }
                    });
                }
                
                if (block.miningTime) {
                    totalMiningTime += block.miningTime;
                    blocksWithTime++;
                }
            });

            const avgBlockTime = blocksWithTime > 0 ? (totalMiningTime / blocksWithTime).toFixed(2) : '0.00';
            const avgTxnsPerBlock = this.state.chain.length > 0 ? (totalTxns / this.state.chain.length).toFixed(1) : '0';

            const blockList = this.state.chain.map(block => {
                const blockSizeKB = (JSON.stringify(block).length / 1024).toFixed(2);
                
                const diffDisplay = block.index === 0 ? "N/A" : (block.difficulty || 0);
                const miningTimeDisplay = block.index === 0 ? "N/A" : (block.miningTime ? `${block.miningTime.toFixed(2)} sec` : '0.00 sec');

                return (
                    <div className="block-card" key={block.index}>
                        <div className="block-card-header">
                            <div className="block-number">
                                <div className="block-icon">
                                    {block.index === 0 ? <span role="img" aria-label="seedling">🌱</span> : `#${block.index}`}
                                </div>
                                <h3>{block.index === 0 ? 'Genesis Block' : `Block ${block.index}`}</h3>
                            </div>
                            <span className="block-status">✓ Verified</span>
                        </div>
                        <div className="block-card-body">
                            <div className="block-field">
                                <span className="block-field-label"><span role="img" aria-label="stopwatch">⏱</span> Timestamp</span>
                                <span className="block-field-value">{new Date(block.timestamp).toLocaleString()}</span>
                            </div>
                            <div className="block-field">
                                <span className="block-field-label"><span role="img" aria-label="link">🔗</span> Block Hash</span>
                                <span className="block-field-value">
                                    <HashDisplay hash={block.hash} />
                                </span>
                            </div>
                            <div className="block-field">
                                <span className="block-field-label"><span role="img" aria-label="arrow">⬅️</span> Previous Hash</span>
                                <span className="block-field-value">
                                    <HashDisplay hash={block.prevHash} />
                                </span>
                            </div>
                            <div className="block-field">
                                <span className="block-field-label"><span role="img" aria-label="pickaxe">⛏️</span> Difficulty</span>
                                <span className="block-field-value">{diffDisplay}</span>
                            </div>
                            <div className="block-field">
                                <span className="block-field-label"><span role="img" aria-label="numbers">🔢</span> Nonce</span>
                                <span className="block-field-value nonce">{block.nonce}</span>
                            </div>
                            <div className="block-field">
                                <span className="block-field-label"><span role="img" aria-label="stopwatch">⏱️</span> Mining Time</span>
                                <span className="block-field-value">{miningTimeDisplay}</span>
                            </div>
                            <div className="block-field">
                                <span className="block-field-label"><span role="img" aria-label="chart">📈</span> Transactions</span>
                                <span className="block-field-value">{Array.isArray(block.transactions) ? block.transactions.length : 0}</span>
                            </div>
                            <div className="block-field">
                                <span className="block-field-label"><span role="img" aria-label="package">📦</span> Block Size</span>
                                <span className="block-field-value">{blockSizeKB} KB</span>
                            </div>
                            <Link to={{pathname:'/view-transactions/' + block.index, query:{blockchain: this.state.chain, index: block.index}}} className="btn-gradient btn-full-width">
                                View Transactions →
                            </Link>
                        </div>
                    </div>
                )
            })
            
            return(
                <div className="page-container">
                    <div className="page-header">
                        <h1><span role="img" aria-label="chains">⛓</span> Blockchain <span className="accent-text">Explorer</span></h1>
                        <p>Inspect all mined blocks and their transactions on the chain</p>
                    </div>
                    
                    <div className="dashboard-grid">
                        <div className="dashboard-card">
                            <div className="dashboard-icon"><span role="img" aria-label="wallet">👛</span></div>
                            <div className="dashboard-content">
                                <span className="label">Wallet Balance</span>
                                <span className="value" style={{color: 'var(--accent-cyan)'}}>{this.state.balance} KPT</span>
                            </div>
                        </div>
                        
                        <div className="dashboard-card">
                            <div className="dashboard-icon"><span role="img" aria-label="brick">🧱</span></div>
                            <div className="dashboard-content">
                                <span className="label">Total Blocks</span>
                                <span className="value" style={{color: 'var(--accent-purple)'}}>{this.state.chain.length}</span>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="dashboard-icon"><span role="img" aria-label="hourglass">⏳</span></div>
                            <div className="dashboard-content">
                                <span className="label">Pending Transactions</span>
                                <span className="value" style={{color: 'var(--accent-orange)'}}>{this.state.pendingTxnsLength}</span>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="dashboard-icon"><span role="img" aria-label="gear">⚙️</span></div>
                            <div className="dashboard-content">
                                <span className="label">Mining Difficulty</span>
                                <span className="value" style={{color: 'var(--accent-green)'}}>{this.props.blockchain.difficulty}</span>
                            </div>
                        </div>
                    </div>



                    <div className="blocks-grid">
                        {blockList}
                    </div>
                    
                    <div className="section-header" style={{ marginTop: '40px' }}>
                        <h2><span role="img" aria-label="globe">🌐</span> Network Statistics</h2>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-label">Chain Length</span>
                            <span className="stat-value cyan">{this.state.chain.length}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Total Txns</span>
                            <span className="stat-value purple">{totalTxns}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Circulating Coins</span>
                            <span className="stat-value orange">{circulatingSupply} KPT</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Pending Txns</span>
                            <span className="stat-value red">{this.state.pendingTxnsLength}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Avg Block Time</span>
                            <span className="stat-value green">{avgBlockTime}s</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Avg Txns / Block</span>
                            <span className="stat-value cyan">{avgTxnsPerBlock}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Difficulty</span>
                            <span className="stat-value orange">{this.props.blockchain.difficulty}</span>
                        </div>
                    </div>
                </div>
            );
        
        }else {
            return (
                <Loader></Loader>
            )
        }
    }
}

export default Home;