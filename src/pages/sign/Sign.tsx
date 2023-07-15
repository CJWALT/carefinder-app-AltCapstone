import React, {useState, ChangeEvent, FormEvent} from 'react'
import {auth} from '../../config/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import './Sign.css'

interface FirebaseError extends Error { 
    code? : string;
}

function Sign (){

    const [firstname, setFirstName] = useState <string>('');
    const [lastname, setLastName] = useState<string>('');
    const [email, setEmail] = useState <string>('');
    const [pwrd, setPwrd] = useState<string>('');
    const [confirmPwrd, setConfirmPwrd] = useState<string>(''); 
    const [message, setMessage] = useState<string>(''); 


    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) =>{ 
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) =>{ 
        setLastName(e.target.value);
    }
    
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>{ 
        setEmail(e.target.value);
    }
    
    const handlePwrdChange = (e: ChangeEvent<HTMLInputElement>) =>{ 
        setPwrd(e.target.value);
    }

    const handleConfirmPwrdChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setConfirmPwrd(e.target.value);
    }

    const handleSubmit = async (e: FormEvent) =>{ 
        e.preventDefault();

        if(pwrd !== confirmPwrd){ 
            setMessage("Password do not match");
            return;
        }
        try{ 
            await createUserWithEmailAndPassword(auth, email, pwrd); 
            setFirstName('');
            setLastName('');
            setEmail('');
            setPwrd('');
            setPwrd('');
            setMessage(' User Registered Successfully');
        } catch (error){ 
            const firebaseError = error as FirebaseError; 
            let errMessage = ' ';
            switch(firebaseError.code){ 
                case 'auth/email-already-in-use': 
                    errMessage = 'Email already used'; 
                    break; 
                case 'auth/invalid-email': 
                    errMessage = 'Invalid Email address';
                    break; 
                case 'auth/weak-password': 
                    errMessage = 'weak passsword ';
                    break; 
                default:
                    errMessage = 'An error occurred. please try again'; 
                    break; 
                }
                setMessage(errMessage);
        }
    }; 

    return (
        <div className="reg-wrap">
            <form onSubmit={handleSubmit}
             className="reg">
                <h4 className="reg-title">
                    Register to find hospitals in your area 
                    {message && <p>{message}</p>}
                </h4>
                <input type="text" 
                className="form-field" 
                value={firstname}
                onChange={handleFirstNameChange}
                placeholder="First name:"
                required
                />

                <input type="text"
                 className="form-field"
                value={lastname}
                onChange={handleLastNameChange}
                placeholder="Last name"
                required
                 />

                <input type="email" 
                className="form-field" 
                value={email}
                placeholder="Email"
                onChange={handleEmailChange}
                required
                />

                <input type="text"
                 className="form-field" 
                 value={pwrd}
                 onChange={handlePwrdChange}
                 placeholder="Password"
                 required/>

                <input type="text" 
                className="form-field" 
                value={confirmPwrd}
                onChange={handleConfirmPwrdChange}
                placeholder="Confirm password"
                />
                <button type='submit'>Sign Up</button>
                <div className="accept-check">
                    <input type="checkbox" id='accept' className="tnc" />
                    <label htmlFor="accept">I accept the terms of use & privacy policy</label>
                </div>
            </form>
        </div>
    )
    
}

export default Sign;