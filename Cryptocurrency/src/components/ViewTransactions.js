import React, { Component } from 'react';
import Loader from './Loader';
import HashDisplay from './HashDisplay';

class ViewTransactions extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            blockchain: null,
            txns: [],
            publicKey: null,
        }
    }

    componentDidMount() {
        const { location, publicKey } = this.props;
        const blockchain = location?.query?.blockchain;
        const index = location?.query?.index;

        if (blockchain && Array.isArray(blockchain) && blockchain[index] && Array.isArray(blockchain[index].transactions)) {
            this.setState({
                blockchain,
                txns: blockchain[index].transactions,
                publicKey,
                loading: false
            });
        } else {
            this.setState({
                blockchain,
                txns: [],
                publicKey,
                loading: false
            });
        }
    }

    render() {
        const { txns, loading } = this.state;

        if (loading) {
            return <Loader />;
        }

        const txnsList = Array.isArray(txns) ? txns.map((txn, idx) => (
            <tr key={idx}>
                <td className="hash-cell">
                    {txn.from ? <HashDisplay hash={txn.from} /> : '⛏ System (Mining Reward)'}
                </td>
                <td className="hash-cell">
                    {txn.to ? <HashDisplay hash={txn.to} /> : '-'}
                </td>
                <td className="amount-cell">{txn.amount} Kryptos</td>
                <td>
                    <span className={`valid-badge ${txn.isTxnValid ? (txn.isTxnValid().toString() === 'true' ? 'valid' : 'invalid') : ''}`}>
                        {txn.isTxnValid ? (txn.isTxnValid().toString() === 'true' ? '✓ Valid' : '✗ Invalid') : 'N/A'}
                    </span>
                </td>
            </tr>
        )) : null;

        return (
            <div className="page-container">
                <div className="page-header">
                    <h1>🔍 Block <span className="accent-text">Transactions</span></h1>
                    <p>Viewing all transactions recorded in this block</p>
                </div>
                <div className="glass-card" style={{padding: 0, overflow: 'hidden'}}>
                    {txns && txns.length > 0 ? (
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
                                    {txnsList}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">📭</div>
                            <h3>No Transactions Found</h3>
                            <p>This block doesn't contain any transactions yet.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ViewTransactions;