require('dotenv').config();
const {ethers} = require('ethers');


const provider = new ethers.providers.JsonRpcBatchProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

const sender  = '0x512aC9b6E1Fd5BD24B51c09334a67a766E4113C7';
const receiver = '0xD1359Cb1dd80c14314EAC388b4612E7295b55644';
const privatekey =  process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privatekey,provider);
const main = async()=>{
    const senderbal = await provider.getBalance(sender);
    const receiverbal = await provider.getBalance(receiver);
    console.log(`The balance of sender before transaction is : ${ethers.utils.formatEther(senderbal)}`);
    console.log(`The balance of receiver before transaction is : ${ethers.utils.formatEther(receiverbal)}`);

    const transaction = await wallet.sendTransaction({
        to: receiver,
        value: ethers.utils.parseEther("0.002")
    })
    await transaction.wait()
    console.log(transaction)

    const senderbal2 = await provider.getBalance(sender);
    const receiverbal2 = await provider.getBalance(receiver);
    console.log(`The balance of sender after transaction is : ${ethers.utils.formatEther(senderbal2)}`);
    console.log(`The balance of receiver after transaction is : ${ethers.utils.formatEther(receiverbal2)}`);

}
main()