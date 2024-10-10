import crypto from 'crypto';

class Block {
  constructor(index, data, timestamp, previousBlockHash) {
    this.index = index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousBlockHash = previousBlockHash;
    this.currentBlockHash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.index + JSON.stringify(this.data) + this.timestamp + this.nonce
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

export default class BlockChain {
  blockChain = [];

  constructor() {
    this.blockChain.push(new Block(0, 'genesis', new Date(), ''));
    this.difficulty = 4;
  }

  addBlockToChain(data) {
    const newBlock = new Block(
      this.blockChain.length,
      data,
      new Date(),
      this.blockChain[this.blockChain.length - 1].currentBlockHash
    );

    newBlock.mineBlock(this.difficulty);
    this.blockChain.push(newBlock);
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
