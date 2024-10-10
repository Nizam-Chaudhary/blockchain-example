import BlockChain from './blockChain.js';

const blockChain = new BlockChain();

blockChain.addBlockToChain({
  name: 'Foo Bar',
  age: '28',
  mobile: '1234567890',
});

blockChain.addBlockToChain({
  name: 'John Doe',
  age: '30',
  mobile: '1234567890',
});

console.log(JSON.stringify(blockChain, null, 4));

console.log('is block chain valid', blockChain.isBlockChainValid());

blockChain.blockChain[2].data = {
  name: 'John Doe 2',
  age: '30',
  mobile: '1234567890',
};

console.log('is block chain valid', blockChain.isBlockChainValid());
