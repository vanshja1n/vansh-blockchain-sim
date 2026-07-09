import Block from './Block';
import Transaction from './Transaction';

class Blockchain {
  constructor(difficulty) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
    this.pendingTxns = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), 'Genesis Block');
  }

  minePendingTxns(minerAddr) {
    const rewardTx = new Transaction(null, minerAddr, this.miningReward);

    const allTxns = [...this.pendingTxns, rewardTx];

    const newIndex = this.getLatestBlock().index + 1;
    const block = new Block(newIndex, Date.now(), allTxns);
    block.prevHash = this.getLatestBlock().hash;
    block.mineBlock(this.difficulty);
    this.chain.push(block);


    this.pendingTxns = [];

    return true;
  }

  addTxn(transaction) {
    if (!transaction.from || !transaction.to) {
      throw new Error('Error: Invalid Txn!');
    }
    if (!transaction.isTxnValid()) {
      throw new Error('Error: Invalid Txn!');
    }
    this.pendingTxns.push(transaction);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  getBalance(addr, currentBalance = 0) {
    let balance = currentBalance;

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      for (const txn of currentBlock.transactions) {
        if (txn.from === addr) {
          balance -= txn.amount;
        }
        if (txn.to === addr) {
          balance += txn.amount;
        }
      }
    }

    return balance;
  }

  isBlockchainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (prevBlock.hash !== currentBlock.prevHash) {
        return false;
      }
      if (currentBlock.calculateBlockHash() !== currentBlock.hash) {
        return false;
      }

      if (!currentBlock.checkValidityOfTxns()) {
        return false;
      }
    }
    return true;
  }

  getPendingTxns() {
    return this.pendingTxns;
  }
}

export default Blockchain;