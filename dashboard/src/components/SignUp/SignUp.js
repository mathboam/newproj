import React, {Component} from 'react';
import 'whatwg-fetch';
import { getFromStorage,setInStorage, } from '../../utils/storage';
import './SignUp.css';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      token: '',
      signUpError:'',
      signUpFullName: '',
      signUpEmail: '',
      signUpPassword: ''
    };
    this.onTextboxChangeSignUpFullName = this.onTextboxChangeSignUpFullName.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
  
    this.onSignUp = this.onSignUp.bind(this);
  }
  componentDidMount(){
     
    const obj =getFromStorage('the_main_app');
    if(obj && obj.token){
      const  { token } = obj; 
      //verify token
      fetch('/api/account/verify?token='+token)
      .then(res=> res.json())
      .then(json =>{
       if(json.success){
         this.setState({
           token: token,
           isLoading: false
         });
       } else{
         this.setState({
          isLoading: false,
         });
       }
      });  
    } else{
     this.setState({
       isLoading:false,
     });
    }

  }

  onTextboxChangeSignUpFullName(event){
    this.setState({
        signUpFullName: event.target.value,
    });
  }
  onTextboxChangeSignUpEmail(event){
    this.setState({
        signUpEmail: event.target.value,
    });
  }
  onTextboxChangeSignUpPassword(event){
    this.setState({
        signUpPassword: event.target.value,
    });
  }

  onSignUp(){
    //grabing the state
    const { 
      signUpFullName,
      signUpEmail,
      signUpPassword
    } = this.state;

    this.setState({
      isLoading: true,
    })
    //making a post request to the backend

    fetch('/api/account/signup', { 
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        fullName: signUpFullName,
        email: signUpEmail,
        password: signUpPassword
      }),
     })
     .then(res => res.json())
     .then(json => {
         console.log('json', json); 
         if(json.success){
           this.setState({
            signUpError: json.message,
             isLoading: false,
             signUpFullName: '',
             signUpEmail: '',
             signUpPassword: ''
           });
         } else{
           this.setState({
            signUpError: json.message,
             isLoading: false,
           });  
         }
          
     });
 }

  render(){
    const {
      token,
      signUpError,
      signUpFullName,
      signUpEmail,
      signUpPassword
    } = this.state;
    
    //checking if token is not set then there'll be a sign in process

    if(!token){
      return(
        <div>
          <div className="signup">
             <div className="form">
               <form className="signIn-form" >
                  {
                    (signUpError)? (
                      <p>{signUpError}</p>
                    ) :(null)
                  }
                <p>Sign Up</p>
                <input type="text" 
                  placeholder="Full Name"
                  value={ signUpFullName}
                  onChange ={this.onTextboxChangeSignUpFullName}
                  /><br />
                <input type="email" 
                  placeholder="Email"
                  value={ signUpEmail}
                  onChange ={this.onTextboxChangeSignUpEmail}
                  /><br />
                <input type="password" 
                  placeholder="Password"
                  value={ signUpPassword}
                  onChange ={this.onTextboxChangeSignUpPassword}
                  /><br />
                  <button onClick={this.onSignUp}>Sign Up</button>
                  <p className="message">Already Registered? <Link className="link" to="/">Login</Link> </p>
                </form>
              </div>
          </div>
        </div>
      )};
    
    //returning Account if token is set and verified

    return(
      <div>
        <p>Account</p>
        {/* <button onClick= {this.logout}>Logout</button> */}
      </div>
    );
  }

}

export default SignUp;