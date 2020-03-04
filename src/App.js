import React from 'react';
import './App.css';
import logo from './view/images/Trollface.png';
import axios from 'axios';


class App extends React.Component {
  
 constructor(){
   super();
   this.state = {
     selectMemes: 'https://i.imgflip.com/1otk96.jpg',
     topText: '',
     bottomText: '',
     textColor: 'whiteColor',
     memeImg: '',
     allMemeImages: [],
     imageCounter: 0,
  
   }
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   //this.handleColor = this.handleColor.bind(this);
   this.memesarray = [];
 }

  componentDidMount(){
    axios.get('https://api.imgflip.com/get_memes')
      .then(response => {
        const memes = response.data;
        //console.log(JSON.stringify( memes));
        const memeItem = [];
        for(let i=0; i<memes.data.memes.length;i++){
          memeItem.push(<option key={memes.data.memes[i].id} value={memes.data.memes[i].url}>{memes.data.memes[i].name}</option>);
        }
        this.setState({ 
          allMemeImages: memes,
          memeImg: memes.data.memes[0].url
       });
       this.memesarray = memeItem;
       this.setState({
         imageCounter: 1
       });
      //  console.log(this.memesarray);
      })
  }
  handleSubmit(event){
     event.preventDefault();
    //  let newCounter = this.state.imageCounter + 1;
    //  this.setState({
    //   memeImg: this.state.allMemeImages.data.memes[this.state.imageCounter].url,
    //   imageCounter: newCounter
    // });
    // New feature added.

     this.setState({
      memeImg: this.state.selectMemes
    });
    console.log(this.state.selectMemes);
  }
  handleChange(event){
    const {name,value} = event.target;
    this.setState({
      [name] : value
    });
  }
  // handleColor(event){
  //   this.setState({
  //      textColor: event.target.value
  //   });
  //   // const textdiv = document.getElementsByClassName('top-text');
  //   // textdiv.classList.add('whiteColor');
  // }
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
               <p>Type something on your meme:</p>
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
               <label htmlFor="select">Select your image:</label> <br/>
               <select 
                  name="selectMemes" 
                  value={this.state.selectMemes}
                  onChange={this.handleChange}
                  >
                  {this.memesarray}
               </select>
               <button className="generate-button">Memes</button>
               {/* <label htmlFor="">Text color:</label>
               <select 
                  name="textColor" 
                  value={this.state.textColor}
                  onChange={this.handleColor}
                  >
                  <option value="black">Dark</option>
                  <option value="white">Light</option>
               </select> */}
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
