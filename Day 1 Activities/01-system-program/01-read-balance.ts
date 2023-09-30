import * as Web3 from "@solana/web3.js";

async function main() {
  const publicKey = "AiyUGNRVbrDVvC8KjCpuzwYdoVtWMTpvVHjMgMgoU7JA";
  const url = Web3.clusterApiUrl("devnet");
  const connection = new Web3.Connection(url);
  const balance = await connection.getBalance(new Web3.PublicKey(publicKey));
  const solBalance = balance / Web3.LAMPORTS_PER_SOL;
  console.log("balance", solBalance);
}

main();
