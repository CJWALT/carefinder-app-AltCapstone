import React, { ChangeEvent, useState } from 'react'
import { auth } from '../../config//firebaseConfig';
import {useNavigate} from 'react-router-dom'; 
import {signInWithEmailAndPassword } from 'firebase/auth'; 
import './Login.css';



interface FirebaseError extends Error{ 
  code? : string ;
}

function Login() {

  const navigate = useNavigate(); 
  const [email, setEmail] =useState<string>('');
  const [pwrd, setPwrd] = useState<string>(''); 
  const [message, setMessage] = useState<string>(''); 

  const handleEmailChange = ( e:  ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setEmail(e.target.value);
  }; 

  const handlePasswordChange = ( e:ChangeEvent<HTMLInputElement>) => { 
    e.preventDefault();
    setPwrd(e.target.value);
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement> ) =>{
       e.preventDefault(); 

    try{ 
      await signInWithEmailAndPassword( auth, email, pwrd);
      navigate('/');
    } catch(err){ 
      const firebaseErorr = err as FirebaseError; 
      let errMsge = ''; 
      
      switch (firebaseErorr.code){ 
        case 'auth/user-not-found': 
          errMsge = 'User details not found'
          break; 
        case 'auth/invalid-email': 
          errMsge = 'Invalid email address'
          break;
        case 'auth/wrong-password': 
          errMsge = 'The password is incorrect'; 
          break; 

          default: 
          errMsge = 'An error occured. Please try again'; 
          break;
      }
      setMessage(errMsge);
    }
  }; 
 
  return (
    <form onSubmit={handleSubmit} className="form-wrap">  
      <h4 className="form-heading"></h4>
      {message && <p>{message } </p>}

      <input type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email:"
        required
        />

        <input type="password"
          className="pwrd-field"
          value={pwrd}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          required
          />
        <button type='submit' className="btn"> 
        Login
        </button>

        <div className="check">
          <div>
            <input type="checkbox" 
            id="accept" className='rem-check' />
            <label htmlFor="accept" className="tnc">Remember</label>
          </div>
        </div>
    </form>

  )
}

export default Login