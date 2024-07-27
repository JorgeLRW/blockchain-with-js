const SHA256 = require('crypto-js/sha256');

class Block {
    constructor (timestamp, data) {
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = 0;
        this.hash = this.calculateHash;
        this.nonce = 0;
    };

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.nonce + this.timestamp + this.data).toString();
    };

    mineBlock(difficulty) {

    };
};

class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
    };

    createGenesis() {
        return new Block(0, "01/01/2024", "This is the first Block", "0")
    };

    latestBlock() {
        return this.chain[this.chain.length - 1]
    };

    addBlock(newBlock) {
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    };

    checkValid() {
        for(let i = 1; i < this.chain.length; ++i) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            };

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            };
        };
        return true;
    };
};

let jsChain = new Blockchain();
jsChain.addBlock(new Block("07/26/2024", {amount: 5}));
jsChain.addBlock(new Block("07/26/2024", {amount: 12}));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is block chain valid? " + jsChain.checkValid());

