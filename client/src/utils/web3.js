import Web3 from "web3";

export const Web3States = {
  NoWeb3: "noWeb3",
  NoAccount: "noAccount",
  OK: "Ok"
};

const returnWeb3 = async () => {
    window.web3 = new Web3(window.web3.currentProvider);
    const accounts = await window.web3.eth.getAccounts();
    if (!accounts || !accounts.length) {
        return { res: Web3States.NoAccount };
    }

    const networkId = await window.web3.eth.net.getId();

    return {
      res: Web3States.OK,
      networkId: networkId,
      account: accounts[0],
      web3: window.web3
    };
};

const returnNoWeb3 = () => {
    return {
        res: Web3States.NoWeb3
    };
};

export const web3Checker = async function() {

    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            return await returnWeb3();
        } catch (error) {
            // User denied account access...
            return returnNoWeb3();
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        return await returnWeb3();
    }
    // Non-dapp browsers...
    else {
        return returnNoWeb3();
    }
};
