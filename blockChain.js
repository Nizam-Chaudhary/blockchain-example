import crypto from 'crypto';

class Block {
  constructor(transactions, timestamp, previousBlockHash) {
    this.transactions = transactions;
    this.timestamp = timestamp;
    this.previousBlockHash = previousBlockHash;
    this.currentBlockHash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.index +
          JSON.stringify(this.transactions) +
          this.timestamp +
          this.nonce
      )
      .digest('hex');
  }

  mineBlock(difficulty) {
    while (
      this.currentBlockHash.substring(0, difficulty) !==
      Array(difficulty + 1).join(0)
    ) {
      this.nonce++;
      this.currentBlockHash = this.calculateHash();
    }

    console.log('Block Mined: ', this.currentBlockHash);
  }
}

export class BlockChain {
  constructor() {
    this.blockChain = [new Block('genesis', new Date(), '')];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(
      this.pendingTransactions,
      Date.now(),
      this.blockChain[this.blockChain.length - 1].currentBlockHash
    );
    block.mineBlock(this.difficulty);
    console.log('block successfully mined');
    this.blockChain.push(block);

    this.pendingTransactions = [
      new Transaction('', miningRewardAddress, this.miningReward),
    ];
  }

  createTransactions(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.blockChain) {
      for (const transaction of block.transactions) {
        if (transaction.from === address) {
          balance -= transaction.amount;
        }

        if (transaction.to === address) {
          balance += transaction.amount;
        }
      }
    }
    return balance;
  }

  getLatestBlock() {
    return this.blockChain[this.blockChain.length - 1];
  }

  isBlockChainValid() {
    for (let i = 1; i < this.blockChain.length; i++) {
      const currentBlockHash = this.blockChain[i].currentBlockHash;
      const previousBlockHash = this.blockChain[i].previousBlockHash;
      if (currentBlockHash != this.blockChain[i].calculateHash()) {
        return false;
      }

      if (previousBlockHash != this.blockChain[i - 1].calculateHash()) {
        return false;
      }
    }

    return true;
  }
}

export class Transaction {
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}
