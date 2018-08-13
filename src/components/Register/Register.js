import React from 'react';

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state={
			name:'',
			email:'',
			password:''
		}
	}
	name=(event)=>{
		this.setState({name:event.target.value});
	}
	email=(event)=>{
		this.setState({email:event.target.value});
	}
	password=(event)=>{
		this.setState({password:event.target.value});
	}
	onRegister=()=>{
		fetch('https://pure-reaches-57477.herokuapp.com/signup',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				name:this.state.name,
				email:this.state.email,
				password:this.state.password
			})
		})
		.then(response=>response.json())
		.then(data=>{
			if(data==='registered'){
				alert("Registered");
				this.props.onRouteChange('signin')
			}
		})
	}
	render(){
		return(
			<article className="br2  center ma2">
			  <div className=" ba pa5 shadow-5 br2">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f4 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Username</label>
			        <input onChange={this.name} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input onChange={this.email} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input onChange={this.password} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      		onClick={this.onRegister}
			      		className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
			    </div>
			  </div>
			 </article>
		);
	}
}

export default Register;