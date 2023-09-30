import { useState, useEffect } from 'react'


import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import buffer from 'buffer';
import * as Web3 from '@solana/web3.js';
import * as borsh from "@project-serum/borsh";
import './App.css'
import * as base58 from 'bs58';


function App() {
  window.Buffer = buffer.Buffer;


  const borshAccountSchema = borsh.struct([
    borsh.str('msg'),
  ]);




  const [message, setMessage] = useState(null);
  const [msgPubKey, setMsgPubKey] = useState(null);
  const [messages, setMessages] = useState([]);
  const url = Web3.clusterApiUrl('devnet');
  const connection = new Web3.Connection(url);
  const MessageProgramID = new Web3.PublicKey('2t1fWWsVL5vRqsyLGi2h6yqSLQmQcx1zvkXm2rGrJPrR');


  useEffect(() => {
    async function fetchAllAccounts () {
      const accounts = await connection.getProgramAccounts(new Web3.PublicKey(MessageProgramID));
      const decodedAccounts = accounts.map((account) => {
        return borshAccountSchema.decode(account.account.data);
      });
      console.log(decodedAccounts)
      setMessages(decodedAccounts)
    }
    fetchAllAccounts();
  }, [])


  async function handleViewMessages () {
    try {
      const pubKey = new Web3.PublicKey(msgPubKey);
      const accountInfo = await connection.getAccountInfo(pubKey);
 
      if (accountInfo === null) {
        console.log('Account not found.');
      } else {
        // Account data is in accountInfo.data
        const decoded = borshAccountSchema.decode(accountInfo.data);
        console.log('Account data:', decoded.msg);
        alert(decoded.msg)
      }
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  }


  async function addMessage () {
    const buffer = Buffer.alloc(1000)
    borshAccountSchema.encode({ msg: message }, buffer)
    const instructionBuffer = buffer.slice(0, borshAccountSchema.getSpan(Buffer.alloc(1000)))


    console.log('instructionBuffer', instructionBuffer);


    const decoded = base58.decode("5jESUbChANhUngcqmmvzwD2tkrvhK4BjLbhu2a8aAqB7cYqrFdq4357zdSxf7hbnQp5UVX4HdZEz6TyBzJk1kvJM");
    const keyPair = await Web3.Keypair.fromSecretKey(decoded);


    const [pda] = await Web3.PublicKey.findProgramAddress(
      [Buffer.from("message_account"), keyPair.publicKey.toBuffer(), Buffer.from(message)],// new TextEncoder().encode(movie.title)],
      new Web3.PublicKey(MessageProgramID));




    const transaction = new Web3.Transaction()
    const instruction = new Web3.TransactionInstruction({
      keys: [
        {
          pubkey: keyPair.publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: new Web3.PublicKey(MessageProgramID),
          isSigner: false,
          isWritable: false,
        }
      ],
      data: instructionBuffer,
      programId: MessageProgramID
    })


    transaction.add(instruction)


    Web3.sendAndConfirmTransaction(connection, transaction, [keyPair]).then((txid) => {
      Alert(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
    })


  }
 


  return (
    <>
    <h1>Solana Messages</h1>
      {/* <input type="text" onChange={(event) => {setMessage(event.target.value)}}/>
      <button onClick={addMessage}>Add Message</button> */}
     
      {/* <br /> */}
      <input type="text" onChange={(event) => {setMsgPubKey(event.target.value)}}/>
      <button onClick={handleViewMessages}>View Message</button>
      <h3>Fetch All</h3>
     


      <div>
      {messages.length === 0 ? (
        <p>The array is empty.</p>
      ) : (
        <ul>
          {messages.map((item, index) => (
            <li key={index}>{item.msg}</li>
          ))}
        </ul>
      )}
    </div>
    </>
  )
}


export default App
