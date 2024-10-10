import { BlockChain, Transaction } from './blockChain.js';

const blockChain = new BlockChain();

blockChain.createTransactions(new Transaction('address1', 'address2', 100));
blockChain.createTransactions(new Transaction('address2', 'address1', 50));

console.log('\n starting the miner');
blockChain.minePendingTransactions('xavier');

console.log('\n Balance of xavier', blockChain.getBalanceOfAddress('xavier'));

console.log('\n starting the miner again');
blockChain.minePendingTransactions('xavier');

console.log('\n Balance of xavier', blockChain.getBalanceOfAddress('xavier'));

console.log(JSON.stringify(blockChain, null, 2));
