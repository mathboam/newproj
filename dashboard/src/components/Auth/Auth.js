import React,{useState,useEffect} from 'react';
import {Route,useLocation,Redirect} from 'react-router-dom'
// import { getFromStorage,setInStorage, } from '../../utils/storage';
// import { set } from 'mongoose';

export default function Auth({children,...rest}){
    let [error,setError] = useState('');
    let [access,setaccess] = useState(false);
    
    const location = useLocation();
    useEffect(() => {
         const setaccess((()=>{
            console.log(location.state)
            if (location.state === undefined) {
                console.log(access);
                return
            } else {
                let auth = false;
                console.log(location.state);
                        const {mail,pass} = location.state.detail;
                    fetch('/api/account/signin', { 
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        email: mail,
                        password: pass
                    })
                    })
                    .then(
                        res => res.json(),
                    )
                    .catch(err=> console.log(err))
                    .then(json => {
                            console.log('json', json); 
                            if (json.sucess) {
                            auth = json.sucess;
                            console.log(auth);
                        }       
                    })
                                   
        }
        return true
        })());
    }, [])

    return(
        <Route {...rest} render={({location})=>
             access ? (
                children
                ) : (
                    <Redirect 
                    to={{
                        pathname:'/',
                        state: {from:location}
                    }} 
                    />
                    )
                }

        />
     );
}