import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';



const particlesOption={
  particles: {
    number:{
      value:30,
      density:{
        enable:true,
        value_area: 300
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
      isSignedIn:false,
      user:{
        name: '',
        email:'',
        entries: 0,
        joined: ''
      }
    }
  }
  loadUser=(data)=>{
    this.setState({user:{
        name: data.name,
        email:data.email,
        entries: data.entries,
        joined: data.joined
    }});
  }
 onRouteChange=(route)=>{
    if(route==='home'){
      this.setState({
          isSignedIn:true,
          imageUrl:''
        });
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
      fetch('https://pure-reaches-57477.herokuapp.com/imageurl',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          input:this.state.input
        })
      })
      .then(response=>response.json())
      .then(response=> {
        if(response){
          fetch('https://pure-reaches-57477.herokuapp.com/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              name:this.state.user.name
            })
          })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err=>console.log(err));
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
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div> :
          (this.state.route==='signin'?
             <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>:
             <Register onRouteChange={this.onRouteChange} />
           )
        }
      </div>
    );
  }
}

export default App;
