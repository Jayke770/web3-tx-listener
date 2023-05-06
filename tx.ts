import Web3 from "web3"
let lasttxHash: string
class TxChecker {
    private web3: Web3
    constructor() {
        this.web3 = new Web3('https://eth.llamarpc.com')
    }
    check() {
        return new Promise(async (resolve, reject) => {
            try {
                const block = await this.web3.eth.getBlock("latest")
                if (block && block?.transactions) {
                    for (let txHash of block.transactions) {
                        const tx = await this.web3.eth.getTransaction(txHash)
                        if (tx && lasttxHash !== tx?.hash) {
                            lasttxHash = txHash
                            console.log(tx.hash, tx.from, tx.to, this.web3.utils.fromWei(tx.value, 'ether'), tx.blockNumber)
                        }
                    }
                }
            } catch (e) {
                console.log("Error", e)
            }
        })
    }
}
const txns = new TxChecker()
setInterval(() => txns.check(), 1000)