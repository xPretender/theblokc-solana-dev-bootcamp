import * as Web3 from "@solana/web3.js";
import bs58 from "bs58";
const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
const PRIVATE_KEY =
  "2MGL9YxYWnik1ikYfZEo3uvX6oQ7PrtLqdhLp19aJZ5HGgQC5VP3Bcp491qHata5UDV8u9w12Xz9Zcj2mwB616ug";
async function main() {
  const privateKeyIntArray = bs58.decode(PRIVATE_KEY);
  const signer = Web3.Keypair.fromSecretKey(privateKeyIntArray);
  const transaction = new Web3.Transaction();
  const sendSolTransaction = Web3.SystemProgram.transfer({
    fromPubkey: new Web3.PublicKey(
      "AiyUGNRVbrDVvC8KjCpuzwYdoVtWMTpvVHjMgMgoU7JA"
    ),
    toPubkey: new Web3.PublicKey(
      "63iBr9tCoL2p4brovggG1ZzutYQYVtQVwPPvUtvFw3Qw"
    ),
    lamports: 2 * Web3.LAMPORTS_PER_SOL,
  });
  transaction.add(sendSolTransaction);
  const txHash = await Web3.sendAndConfirmTransaction(connection, transaction, [
    signer,
  ]);
  console.log("txHash / txSignature:", txHash);
}

main();
