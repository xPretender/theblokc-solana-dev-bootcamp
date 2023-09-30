import 'dotenv/config'
import base58 from 'bs58'
import * as Web3 from '@solana/web3.js'
import * as token from "@solana/spl-token"

const url = Web3.clusterApiUrl("devnet")
const connection = new Web3.Connection(url);
const publicKey = new Web3.PublicKey('AiyUGNRVbrDVvC8KjCpuzwYdoVtWMTpvVHjMgMgoU7JA')
const decoded = base58.decode(process.env.PRIVATE_KEY as any)
const keyPair = Web3.Keypair.fromSecretKey(decoded)

async function createNewMint(
    connection: Web3.Connection,
    payer: Web3.Keypair,
    mintAuthority: Web3.PublicKey,
    freezeAuthority: Web3.PublicKey,
    decimals: number
): Promise<Web3.PublicKey> {

    const tokenMint = await token.createMint(
        connection,
        keyPair,
        publicKey,
        publicKey,
        9
    );

    console.log(`The token mint account address is ${tokenMint}`)
    console.log(
        `Token Mint: https://explorer.solana.com/address/${tokenMint}?cluster=devnet`
    );

    return tokenMint;
}

createNewMint(connection, keyPair, publicKey, publicKey, 9);