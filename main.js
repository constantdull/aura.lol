import StrangeAttractors from '../../artifacts/contracts/StrangeAttractors.sol/StrangeAttractors.json'
const strangeAddress = "0x1cA15CCdd91b55CD617a48dC9eEFb98CAe224757"

export const getSignedContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(strangeAddress, StrangeAttractors.abi, signer)
    return contract;
}

export const mint = async (to, num) => {
    try {
        if (typeof window.ethereum !== 'undefined') {
            const contract = getSignedContract();

            const MINT_PRICE = await contract.MINT_PRICE();
            await contract.mint(to, num, {
                value: num * MINT_PRICE, gasLimit: 300000
            });
        }
    } catch (err) {
        console.log("Mint Error: ", err)
    }
}
