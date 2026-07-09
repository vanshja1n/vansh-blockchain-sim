import React, { Component } from 'react';
import Loader from './Loader';
import HashDisplay from './HashDisplay';

class PendingTransactions extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            blockchain: null,
            pendingTxns: [],
            publicKey: null,
            justMined: false,
            isMining: false,
        }
    }

    componentWillMount(){
        console.log(this.props)
        this.setState({
            blockchain: this.props.blockchain,
            pendingTxns: this.props.blockchain.getPendingTxns(),
            publicKey: this.props.publicKey,
            loading: false
        });
    }

    mineTxns = (e) => {
        e.preventDefault();

        if (this.state.pendingTxns.length === 0 || this.state.isMining) {
            return;
        }

        this.setState({ isMining: true, justMined: false });

        setTimeout(() => {
            if(this.state.blockchain.minePendingTxns(this.state.publicKey)){
                if(this.state.blockchain.isBlockchainValid()){
                    this.setState({
                        pendingTxns: this.state.blockchain.getPendingTxns(),
                        justMined: true,
                        isMining: false
                    });
                }else{
                    this.setState({ isMining: false });
                    alert('Error in mining the block!');
                }
            }else{
                this.setState({ isMining: false });
                alert('Error in mining the block!');
            }
        }, 900);
    }

    render() {
        const { pendingTxns, loading, justMined, isMining } = this.state;
        const hasPendingTxns = pendingTxns.length > 0;

        const pendingTxnsList = pendingTxns.map((pendingTxn, idx) => {
            return(
                <tr key={idx}>
                    <td className="hash-cell">
                        {pendingTxn.from ? <HashDisplay hash={pendingTxn.from} /> : '⛏ System (Mining Reward)'}
                    </td>
                    <td className="hash-cell">
                        {pendingTxn.to ? <HashDisplay hash={pendingTxn.to} /> : '-'}
                    </td>
                    <td className="amount-cell">{pendingTxn.amount} Kryptos</td>
                    <td>
                        <span className={`valid-badge ${(pendingTxn.isTxnValid()).toString() === 'true' ? 'valid' : 'invalid'}`}>
                            {(pendingTxn.isTxnValid()).toString() === 'true' ? '✓ Valid' : '✗ Invalid'}
                        </span>
                    </td>
                </tr>
            )
        });

        if(loading === false){
            return(
                <div className="page-container">
                    <div className="page-header">
                        <h1>⏳ Pending <span className="accent-text">Transactions</span></h1>
                        <p>These transactions are waiting to be included in the next mined block</p>
                    </div>

                    {/* Mining Overlay Modal */}
                    <div className={`mining-overlay ${isMining ? 'active' : ''}`}>
                        <div className="mining-modal">
                            <div className="mining-spinner"></div>
                            <h2>⛏ Mining Block...</h2>
                            <p>Finding valid nonce...</p>
                            <p style={{fontSize: '0.8rem', opacity: 0.7}}>Difficulty: {this.props.blockchain.difficulty}</p>
                        </div>
                    </div>

                    {/* Success banner after mining */}
                    {justMined && !isMining && (
                        <div className="alert-modern success" style={{marginBottom: '1.5rem'}}>
                            ✅ Block mined successfully! Mining reward of <strong>100 KPT</strong> has been credited to your wallet.
                        </div>
                    )}

                    <div className="glass-card" style={{padding: 0, overflow: 'hidden'}}>
                        {hasPendingTxns ? (
                            <div style={{overflowX: 'auto'}}>
                                <table className="table-modern">
                                    <thead>
                                        <tr>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingTxnsList}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">📭</div>
                                <h3>No Pending Transactions</h3>
                                <p>Create a transaction first, then come back here to mine it into a block.</p>
                            </div>
                        )}
                    </div>
                    <div className="action-bar">
                        <div className="txn-count">
                            <span>{pendingTxns.length}</span> transaction{pendingTxns.length !== 1 ? 's' : ''} pending
                        </div>
                        {/* Disable the mine button when there are zero pending transactions */}
                        <button
                            type="button"
                            onClick={this.mineTxns}
                            className={`btn-gradient btn-gradient-warm mining-btn ${(!hasPendingTxns || isMining) ? 'btn-disabled' : ''}`}
                            disabled={!hasPendingTxns || isMining}
                            title={!hasPendingTxns ? 'No transactions to mine' : 'Mine all pending transactions into a new block'}
                        >
                            <span className="mine-icon">⛏</span> Mine Pending Transactions
                        </button>
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

export default PendingTransactions;