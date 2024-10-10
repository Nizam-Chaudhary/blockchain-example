import crypto from 'crypto';

class Block {
  constructor(index, data, timestamp, previousBlockHash) {
    this.index = index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousBlockHash = previousBlockHash;
    this.currentBlockHash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(this.data))
      .digest('hex');
  }
}

export default class BlockChain {
  blockChain = [];

  constructor() {
    this.blockChain.push(new Block(0, 'genesis', new Date(), ''));
  }

  addBlockToChain(data) {
    this.blockChain.push(
      new Block(
        this.blockChain.length,
        data,
        new Date(),
        this.blockChain[this.blockChain.length - 1].currentBlockHash
      )
    );
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
