import 'dotenv/config'
import base58 from 'bs58'
import * as Web3 from '@solana/web3.js'
import * as token from "@solana/spl-token"

const url = Web3.clusterApiUrl("devnet")
const connection = new Web3.Connection(url);
const publicKey = new Web3.PublicKey('AiyUGNRVbrDVvC8KjCpuzwYdoVtWMTpvVHjMgMgoU7JA')
const decoded = base58.decode(process.env.PRIVATE_KEY as any)
const keyPair = Web3.Keypair.fromSecretKey(decoded)
const tokenAccount = new Web3.PublicKey('D2VVuGQa5iE96PUn8YDGN5HmxenwdBeG1bWrpdh6nJHk')
const tokenMint = new Web3.PublicKey('8EArH3QHt3g3mktvnqh3omqY4HTm9kiNextqoHNj2cnc')
const signer = Web3.Keypair.fromSecretKey(decoded);
const mint = base58.decode(process.env.MINT_PKEY as any)
const mintDecode = new Web3.PublicKey(mint)
async function main() {
    const mintToken = await token.mintTo(connection, signer, mintDecode , tokenAccount,keyPair, 10)
    console.log(mintToken)
}

main();