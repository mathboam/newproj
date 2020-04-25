import React, {Component} from 'react';
import ReactDom, {render}from 'react-dom';
import 'whatwg-fetch';
import { getFromStorage,setInStorage, } from '../../utils/storage';
import '../SignUp/SignUp.css';
import { BrowserRouter as Router, Link,withRouter} from 'react-router-dom';

class Home extends Component{
  constructor(props){
    super(props);
    this.state ={
      isLoading: false,
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);
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
           isLoading: false,
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

  onTextboxChangeSignInEmail(event){
    this.setState({
        signInEmail: event.target.value,
    });
  }
  onTextboxChangeSignInPassword(event){
    this.setState({
        signInPassword: event.target.value,
    });
  }

  onSignIn(event){
    //grabing the state
    const {
      signInEmail,
      signInPassword
    } = this.state;

    console.log("email:" ,signInEmail);
    console.log("password:" ,signInPassword);
  


    //making a post request to the backend

    let {history} = this.props;

    console.log(history);
    history.replace({
      pathname:'/dashboard',
      state:{detail:{mail:signInEmail,pass:signInPassword}}
    })


    // fetch('/api/account/signin', { 
    //   method: 'POST',
    //   headers : {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: signInEmail,
    //     password: signInPassword
    //   }),
    //  })
    //   .then(res => res.json())
    //   .then(json => {
    //      console.log('json', json); 
        
    //       if(json.sucess){
    //         setInStorage('the_main_app', {token: json.token});  
    //         this.setState({
    //           signInError: json.message,
    //           isLoading: false,
    //           signInEmail: '',
    //           signInPassword: '',
    //           token:json.token,

    //         });
    //         const { history } = this.props;
    //         history.push('/dashboard')
    //       } else{
    //         this.setState({
    //           signInError: json.message,
    //           isLoading: false,
    //         });
    //       }
           
    //   });
      event.preventDefault();
  }

  logout(){
    this.setState({
      isLoading:true
    })
     
      const obj =getFromStorage('the_main_app');
  
      if(obj && obj.token){
        const  { token } = obj; 
  
        //verify token
        fetch('/api/account/logout?token='+token)
        .then(res=> res.json())
        .then(json =>{
         if(json.success){
           this.setState({
             token: '',
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

  render(){
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword
    } = this.state;
    
    if(isLoading){
      return(
        <div><p>Loading.....</p></div>
      );
    }

      //checking if token is not set then there'll be a login process

      if(!token){
        return(
          <Router>
          <div>
            <div className="login">
             <div className="form">
               <form className="login-form" onSubmit={this.onSignIn}>
                  {
                    (signInError)? (
                      <p>{signInError}</p>
                    ) :(null)
                  }
                <p>Login</p>
                <input type="email" 
                  placeholder="Email"
                  value={ signInEmail}
                  onChange ={this.onTextboxChangeSignInEmail}
                  /><br />
                <input type="password" 
                  placeholder="Password"
                  value={ signInPassword}
                  onChange ={this.onTextboxChangeSignInPassword}
                  /><br />
                  {/* <button onClick={this.onSignIn}>Login</button> */}
                  <input className="login-btn" type ="submit" value="Login"/>
                  <p className="message">Not Registered? <Link className="link"  to="/SignUp">  Register</Link></p>
               </form>
             </div>
            </div>
          </div>
          </Router>
        )}
      
        return(
          <div>
            <p>Account</p>
            <button onClick= {this.logout}>Logout</button>
          </div>
        );
        }
    }

        render(
          <Home />,
          document.getElementById('app')
        );

export default withRouter(Home);