import * as Web3 from '@solana/web3.js'
import base58 from 'bs58'
const url = Web3.clusterApiUrl("devnet")
const connection = new Web3.Connection(url);
const publicKey = new Web3.PublicKey('AiyUGNRVbrDVvC8KjCpuzwYdoVtWMTpvVHjMgMgoU7JA')
const decoded = base58.decode('2MGL9YxYWnik1ikYfZEo3uvX6oQ7PrtLqdhLp19aJZ5HGgQC5VP3Bcp491qHata5UDV8u9w12Xz9Zcj2mwB616ug')
const keyPair = Web3.Keypair.fromSecretKey(decoded)
const programID = new Web3.PublicKey("EGzKZqAFrfUrgpYek4Bw95w2jZ4ghFdBbHmMjgAm5vUE")


async function main() {
    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: publicKey,
                isSigner: true,
                isWritable: false,
            }
        ],
        data: Buffer.alloc(20),
        programId:programID
    });
    const transaction = new Web3.Transaction
    transaction.add(instruction)
    const signature = await Web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [keyPair]
    )
    console.log('SIGNATURE', signature)
}

main()
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
});