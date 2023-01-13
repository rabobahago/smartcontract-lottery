const { ethers, network } = require("hardhat")
const fs = require("fs")
module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front end")
        updateContractAddresses()
        updateAbi()
        //await updateContractAddresses()
        console.log("hello")
    }
}
const FRONT_END_ADRESSES_FILE =
    "../nextjs-smartcontract-lottery/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../nextjs-smartcontract-lottery/constants/abi.json"

async function updateAbi() {
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(
        FRONT_END_ABI_FILE,
        raffle.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    // const raffle = await ethers.getContract("Raffle")
    // const chainId = network.config.chainId.toString()
    // const currentAddresses = JSON.parse(
    //     fs.readFileSync(FRONT_END_ADRESSES_FILE, "utf8")
    // )

    // if (chainId in currentAddresses) {
    //     if (!currentAddresses[chainId].includes(raffle.address)) {
    //         currentAddresses[chainId].push(raffle.address)
    //     }
    // } else {
    //     currentAddresses[chainId] = [raffle.address]
    // }
    // fs.writeFileSync(FRONT_END_ADRESSES_FILE, JSON.stringify(currentAddresses))
    const raffle = await ethers.getContract("Raffle")
    const contractAddresses = JSON.parse(
        fs.readFileSync(FRONT_END_ADRESSES_FILE, "utf8")
    )
    if (network.config.chainId.toString() in contractAddresses) {
        if (
            !contractAddresses[network.config.chainId.toString()].includes(
                raffle.address
            )
        ) {
            contractAddresses[network.config.chainId.toString()].push(
                raffle.address
            )
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [raffle.address]
    }
    fs.writeFileSync(FRONT_END_ADRESSES_FILE, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]
