import web3 from './web3';
import novelFactory from './build/novelFactory.json';

const instance = new web3.eth.Contract(
    novelFactory.abi, 
    '0x56f7474880cFb900288621B7A6895CfD3d071f05'
);

export default instance;