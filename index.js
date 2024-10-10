import BlockChain from './blockChain.js';

const blockChain = new BlockChain();

console.log('Mining Block 1');
blockChain.addBlockToChain({
  name: 'Foo Bar',
  age: '28',
  mobile: '1234567890',
});

console.log('Mining Block 2');
blockChain.addBlockToChain({
  name: 'John Doe',
  age: '30',
  mobile: '1234567890',
});

// console.log(JSON.stringify(blockChain, null, 4));
