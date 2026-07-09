import React, { Component } from 'react';
import Loader from './Loader';
import Transaction from '../blockchain-components/Transaction';
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');


class CreateTransaction extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            recv_addr: null,
            amount: 0,
            blockchain: null,
            key: null,
            publicKey: null,
            privateKey: null,
            balance: 0    
        }
    }

    componentDidMount(){
        this.setState({
            blockchain: this.props.blockchain,
            key: this.props.myKey,
            publicKey: this.props.publicKey,
            privateKey: this.props.privateKey,
            loading: false,
            balance: this.props.balance[0]
        });
    }

    onsubmitForm = (e) => {
        e.preventDefault();
        if(this.state.amount <= this.state.balance){
            const priKey = ec.keyFromPrivate(this.state.privateKey);
            const tx = new Transaction(this.state.publicKey, this.state.recv_addr, this.state.amount);
            tx.signTxn(priKey);
            if(tx.isTxnValid()){
                this.state.blockchain.addTxn(tx);
                var myBal = this.state.blockchain.getBalance(this.state.publicKey);
                this.setState({ balance: myBal })
                console.log(this.state.blockchain.getPendingTxns());
                alert('Transaction created successfully!');
            }else{
                throw new Error('Error in txn!')
            }
            this.props.updateMyBalance(this.state.balance);
        }else{
            alert('Insufficient Funds! Try Mining some blocks to earn some Kryptos!')
        }
    }

    onchangeInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {

        if(this.state.loading === false){
            return (
                <div className="page-container">
                    <div className="page-header">
                        <h1>💸 Create <span className="accent-text">Transaction</span></h1>
                        <p>Send cryptocurrency to another wallet address on the blockchain</p>
                    </div>
                    <div className="glass-card" style={{maxWidth: 680}}>
                        <form className="form-modern">
                            <div className="form-group-modern">
                                <label htmlFor="publicKey">Your Address / Public Key</label>
                                <input 
                                    type="text" 
                                    className="form-input mono" 
                                    value={this.state.publicKey} 
                                    id="publicKey" 
                                    onChange={this.onchangeInput} 
                                    disabled
                                />
                                <span className="form-helper">This is your wallet's public address — it cannot be changed</span>
                            </div>
                            <div className="form-group-modern">
                                <label htmlFor="recv_addr">Receiver's Address / Public Key</label>
                                <input 
                                    type="text" 
                                    className="form-input mono" 
                                    id="recv_addr" 
                                    onChange={this.onchangeInput} 
                                    placeholder="Paste recipient's public key..."
                                />
                            </div>
                            <div className="form-group-modern">
                                <label htmlFor="amount">Amount (Kryptos)</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    id="amount" 
                                    onChange={this.onchangeInput} 
                                    placeholder="0.00"
                                />
                                <span className="form-helper">Available balance: <strong style={{color: '#00d4ff'}}>{this.state.balance} Kryptos</strong></span>
                            </div>
                            <button 
                                type="submit" 
                                className="btn-gradient" 
                                onClick={this.onsubmitForm}
                                style={{marginTop: '0.5rem'}}
                            >
                                🚀 Sign & Create Transaction
                            </button>
                        </form>
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

export default CreateTransaction;
