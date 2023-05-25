import './App.css';
import React from "react";
import web3 from './web3';
import factory from "./factory";
import novel from "./novel";
class App extends React.Component{
  state = {
    totalNovels:"null",
    novel : '0',
    admin: '',
    value: '',
    message1 : '',
    message2 : '',
    novelName : '0x3F11a21D243FA8E1882D0A2CAEe744D4CFcd89D6',
    value1 : ''
  }
  async componentDidMount(){
    
    const totalNovels = await factory.methods.totalNovels().call();
    const noveladdress = await factory.methods.getNovels(totalNovels - 1).call();
    const admin = await factory.methods.admin().call();
    // const accounts = await web3.eth.getAccounts();
    // await factory.methods.createNovel("Meet Oswal").send({from: accounts[0]});
    this.setState({totalNovels: totalNovels, novel : noveladdress, admin});
  }
  onSubmit = async(event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const message1 = Date.now();
    await factory.methods.createNovel("Research on Blockchain 3").send({from: accounts[0]}); // create new novel;
    const message2 = Date.now() - message1;
    this.setState({message2 : message2});

    // const novelInstace = novel('0x3F11a21D243FA8E1882D0A2CAEe744D4CFcd89D6');
    // const accounts = await web3.eth.getAccounts();
    // const message1 = Date.now();
    // await novelInstace.methods.uploadNewChapter("https://ipfs.io/ipfs/bafybeib2565wyw6engguvtjerindgehsesf3djhdn3kwnsgqnin7imgiqi/9855_Result_text_plain.txt").send({from: accounts[0]}); //upload new chapter;
    // const message2 = Date.now() - message1;
    // this.setState({message2 : message2});
  }

  onClick = async(event) => {
    this.setState({value1 : ""})
    const accounts = await web3.eth.getAccounts();
    const novelInstace = novel('0x3F11a21D243FA8E1882D0A2CAEe744D4CFcd89D6');

    // const message1 = Date.now();
    // const value = await novelInstace.methods.getChapter(0).call({from: accounts[0]}); //get chapter
    // this.setState({value1 : value})
    // const message2 = Date.now() - message1;
    // this.setState({message2 : message2});


    // const message1 = Date.now();
    // await novelInstace.methods.setFee(100000).send({from: accounts[0]}); //set Fees
    // const message2 = Date.now() - message1;
    // this.setState({message2 : message2});
    // this.setState({value1 : 100000})

    const message1 = Date.now();
    await novelInstace.methods.subscribe(1).send({from: accounts[0], value: 100000}); //subscribe
    const message2 = Date.now() - message1;
    this.setState({message2 : message2});
    this.setState({value1 : 3})

    // const message1 = Date.now();
    // await novelInstace.methods.setFreeChapter(30).send({from: accounts[0]}); //set free chapter
    // const message2 = Date.now() - message1;
    // this.setState({message2 : message2});
    // this.setState({value1 : 30})

  }
  render(){
    return(
      <div>
        <h2>Factory Contract</h2>
        <p>
          {this.state.totalNovels},
          {this.state.novel}
        </p>

        <form onSubmit ={this.onSubmit}>
          <h4>Novel Name</h4>
          <input
          value={this.state.value}
          onChange = {event => this.setState({value : event.target.value})}
          />
          <button>Enter</button>
          {this.state.message2}
      </form>


        <form onSubmit= {this.onSubmit}>
        <h4>Upload Chapter</h4>
          <input
          value={this.state.value}
          onChange = {event => this.setState({value : event.target.value})}
          />
          <button>Enter</button>
          {this.state.message2}
        </form>


        <button onClick= {this.onClick}>

        {/* <h4> Chapter for {this.state.novelName}</h4>
        </button>
        <h4>{this.state.value1}</h4> */}

        <h4>set fees {this.state.novelName}</h4>
        </button>
      <h4>{this.state.value1}</h4>

      {/* <h4>subscribe {this.state.novelName}</h4>
        </button>
        <h4>{this.state.value1}</h4> */}

       {/* <h4>set free chapter {this.state.novelName}</h4>
        </button>
        <h4>{this.state.value1}</h4> */}

      </div>
      
    )
  }
}

export default App;
