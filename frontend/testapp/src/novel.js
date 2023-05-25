import web3 from './web3';
import Novel from './build/Novel.json';

const instance = (address) =>{
    return new web3.eth.Contract(
        Novel.abi,
        address
    );
}

export default instance;