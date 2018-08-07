import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
 apiKey: '8b65ad8a268344429c98ab93c7bec257'
});

const particlesOption={
  particles: {
    number:{
      value:30,
      density:{
        enable:true,
        value_area: 180
      }
    },
    move:{
      enable:true,
      speed:6,
      attract:{
        enable:false,
        rotateX:600,
        rotateY:1200
      }
    }
  }
}
class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false
    }
  }
 onRouteChange=(route)=>{
    if(route==='home'){
      this.setState({isSignedIn:true});
    }else if(route==='signin'||route==='register'){
      this.setState({isSignedIn:false});
    }
    this.setState({route:route});
  }
  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width-(clarifaiFace.right_col*width),
      bottomRow:height-(clarifaiFace.bottom_row*height),
    }
  }
  displayFaceBox=(box)=>{
    console.log(box);
    this.setState({box:box});
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }
  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response=> this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err=>console.log(err)) ;
  }
  render() {
    return (
      <div className="App">
      <Particles className='particles'
              params={particlesOption}
            />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        <Logo />
        { this.state.route==='home' ? 
          <div>
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div> :
          (this.state.route==='signin'?
             <Signin onRouteChange={this.onRouteChange}/>:
             <Register onRouteChange={this.onRouteChange} />
           )
        }
      </div>
    );
  }
}

export default App;
