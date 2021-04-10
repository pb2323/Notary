const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledNotary = require("./build/Notary.json");

const provider = new HDWalletProvider(
  "MNEMONICS",
  "INFURA URL"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const balance = await web3.eth.getBalance(accounts[0]);
  console.log(balance);
  console.log("Attempting to deploy from account ", accounts[0]);
  const result = await new web3.eth.Contract(
    JSON.parse(compiledNotary.interface)
  )
    .deploy({ data: "0x" + compiledNotary.bytecode })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("Contract deployed to ", result.options.address);
};

deploy();
