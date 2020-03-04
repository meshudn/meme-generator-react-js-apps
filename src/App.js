import React from 'react';
import './App.css';
import logo from './view/images/Trollface.png';
import axios from 'axios';


class App extends React.Component {
 constructor(){
   super();
   this.state = {
     topText: '',
     bottomText: '',
     memeImg: '',
     allMemeImages: [],
     imageCounter: 0
   }
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);

 }

  componentDidMount(){
    axios.get('https://api.imgflip.com/get_memes')
      .then(response => {
        const memes = response.data;
        this.setState({ allMemeImages: memes, memeImg: memes.data.memes[0].url });
        //console.log(JSON.stringify( memes));
      })
  }
  handleSubmit(event){
     event.preventDefault();
     let newCounter = this.state.imageCounter + 1;
     this.setState({
      memeImg: this.state.allMemeImages.data.memes[this.state.imageCounter].url,
      imageCounter: newCounter
    });
  }
  handleChange(event){
    const {name,value} = event.target;
    this.setState({
      [name] : value
    });
  }
  render(){
    return (
      <div className="main-container">
        <header>
          <img src={logo} alt="img problem?"/>
          <h3>Meme Generator</h3>
        </header>
        
        <div className="meme-generator">
          <div className="image-selector">
            <form onSubmit={this.handleSubmit}>
               <input 
                 type="text"
                 name="topText"
                 onChange={this.handleChange}
                 value = {this.state.topText}
                 placeholder = "Text on the top"
               />
               <input 
                 type="text"
                 name="bottomText"
                 onChange={this.handleChange}
                 value = {this.state.bottomText}
                 placeholder = "Text on the bottom"
               />
               <button className="generate-button">Create</button>
            </form>
          </div>
          <div className="meme">
               <img src={this.state.memeImg} alt="problem meme img?"/>
               <h2 className="top-text">{this.state.topText}</h2>
               <h2 className="bottom-text">{this.state.bottomText}</h2>
          </div>
        </div>

        <footer>&copy; Meshu Deb Nath | 2020</footer>
      </div>
    );
  }
}

export default App;
