import React , {useContext, useState} from "react";
import { auth } from "../firebase-config";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../firebase-config";
import {  useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [data , setData] = useState({
        
        email: "",
        password: "",
        error:null,
        loading: false,
    });
    
    const Navigate = useNavigate();
    const { email, password, error, loading} = data ;
    const handleChange = e => {
        setData({...data, [e.target.name] : e.target.value})
    };
    const handleSubmit = async (e) => {
        e.preventDefault() ;
        setData({ ...data, error:null, loading: true}) ;
        if (!email || !password){
            setData({...data, error: "All fields are required"})
             ;
             
        }
            try{
                const result = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                
               
                    setData({
                        
                        email:"",
                        password:"",
                        error: null,
                        loading: false,
                    });
                    Navigate("/") ;
            }catch(error){
                setData({...data, error: error.message, loading: false});
            }
       
    } ;
   
    return (
       <section>
           <h3>login </h3>
           <form onSubmit={handleSubmit} >
           <div>
               <label htmlFor="name">Email</label>
               <input type="text" name="email" value={email} onChange={handleChange}/>
            </div>
           
            <div>
               <label htmlFor="password">Password</label>
               <input type="password" name="password" value={password} onChange={handleChange}/>
            </div>
            {error ? <p>{error}</p>: null}
            <div>
                <button disabled={loading}> login </button>
                
                
            </div>
           </form>
           
       </section>
    );
};
export default Login ;