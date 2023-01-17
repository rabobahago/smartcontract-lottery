Getting Started
To run this repo you need to install the following packages:

git
After installing the package run in the terminal the command git --version and if the installation was successful the output should look like this: git version x.xx.x
Nodejs
In the terminal run the command node --version, if the output looks like vxx.xx.x that means the package was installed.
Yarn
Instead of npm install yarn. In the terminal run the command yarn --version, if the output looks like x.xx.xx that means the package was installed.
Quickstart
Clone this repo, cd into the folder and and run yarn to install the dependencies.

git clone https://github.com/rabobahago/smartcontract-lottery.git
cd smartcontract-lottery
yarn
Usage
Compile
yarn hardhat compile
Deployment
yarn hardhat deploy
Testing
yarn hardhat test
Coverage
yarn hardhat coverage
Deployment to a testnet
Set up environment variables:
You'll need to set your RPC_URL_GOERLI and PRIVATE_KEY as enviroment variables. Yo can add them to an .env file.

PRIVATE_KEY: The private key of your account (like from Metamask). NOTE: IT IS RECOMMENDED TO CREATE A NEW ACCOUNT FOR TESTING PURPOSES AND NEVER USE AN ACCOUNT WITH REAL FUNDS.
You can learn how to export a private key here.
RPC_URL_GOERLI: This is the url of the goerli node you are working with. You can set up one for free in Alchemy.
Get test ETH and LINK
Go to https://goerlifaucet.com/ or faucets.chain.link to get test ETH and LINK in your Metamask. Read more about how to set up your wallet with LINK.

Setup a Chainlink VRF Subscription ID
Head over to vrf.chain.link and create a new subscription to get a subscriptionId. You can reuse an old subscription if you already have one.

You can read more in case that you need more information on how to create the Chainlink VRF Subscription ID. After this step you should have:

Subscription ID
Your subscription should be funded with LINK
Deploy your contract with you subscription ID imported
In your helper-hardhat-config.js add your subscriptionId under the section of the chainId you're using. If you're deploying to goerli, add your subscriptionId in the subscriptionId field under the 5 section.

Run:

yarn hardhat deploy --network goerli
Advice: store your contract address for a quick access in case it's needed.

Add your contract address as a Chainlink VRF Consumer
Go back to vrf.chain.link, under your subscription click on Add consumer and insert your contract address. You should also fund the contract with a minimum of 1 LINK.

Register a Chainlink Keepers Upkeep
Read more to find extra information

Go to automation.chain.link and register a new upkeep. Choose Custom logic as the trigger mechanism for the upkeep and insert your contract address. Your UI will look something like this once completed:

Screenshot. The optional fields can be left blank.

Enter your Raffle and get a winner
Your contract is now setup to be a tamper proof autonomous verifiably random lottery. Create a new terminal and run:

yarn hardhat node
Enter the lottery by running:

yarn hardhat run scripts/enter.js --network localhost
Find a winner by running:

yarn hardhat run scripts/mockOffChain.js --network localhost
Note: these commands only work on the localhost.

Estimate gas cost in USD
To get a USD estimation of gas cost, you'll need a COINMARKETCAP_API_KEY environment variable. You can get one for free from CoinMarketCap.

Then, uncomment the line coinmarketcap: COINMARKETCAP_API_KEY, in hardhat.config.js to get the USD estimation. Just note, everytime you run your tests it will use an API call, so it might make sense to have using coinmarketcap disabled until you need it. You can disable it by just commenting the line back out.

Verify on Etherscan
If you deploy to a testnet or mainnet, you can verify it if you get an API Key from Etherscan and set it as an environemnt variable named ETHERSCAN_API_KEY. You can pop it into your .env file as seen in the .env.example.

However, you can manual verify with:

yarn hardhat verify <DEPLOYED_CONTRACT_ADDRESS> --constructor-args
In it's current state, if you have your api key set, it will auto verify goerli contracts.

Linting
To check linting / code formatting:

yarn lint
or, to fix:

yarn lint:fix
