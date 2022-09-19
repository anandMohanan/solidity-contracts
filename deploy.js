const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);

  const wallet = new ethers.Wallet(process.env.WALLET_KEY, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  let currentFav = await contract.retrieve();
  console.log(currentFav.toString());
  const updateFavnumber = await contract.store(10);
  await updateFavnumber.wait(1);
  currentFav = await contract.retrieve();
  console.log(currentFav.toString());
};

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
