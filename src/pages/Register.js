import React , {useState} from "react";
import { auth } from "../firebase-config";
import { setDoc, addDoc ,doc, Timestamp } from "firebase/firestore";
import { db } from "../firebase-config";
import {  useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth";
const Register = (props) => {
    const [data , setData] = useState({
        name: "",
        email: "",
        password: "",
        error:null,
        loading: false,
    });
    const Navigate = useNavigate();
    const { name, email, password, error, loading} = data ;
    const handleChange = e => {
        setData({...data, [e.target.name] : e.target.value})
    };
    const handleSubmit = async (e) => {
        e.preventDefault() ;
        setData({ ...data, error:null, loading: true}) ;
        if (!name || !email || !password){
            setData({...data, error: "All fields are required"}) ;
        }
            try{
                const result = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                await addDoc(doc(db, 'users', result.user.uid) , {
                uid: result.user.uid,
                name,
                email,
                password,
                createdAt: Timestamp.fromDate(new Date()),
                    });
                    setData({
                        name:"",
                        email:"",
                        password:"",
                        error: null,
                        loading: false,
                    });
                    
                    
                    Navigate("/") ;
            }catch(error){
                setData({...data, error: error.message, loading: false})
            };
       
    } ;
   
    return (
       <section>
           <h3>create an account</h3>
           <form onSubmit={handleSubmit}>
           <div>
               <label htmlFor="name">Name</label>
               <input type="text" name="name" value={name} onChange={handleChange}/>
            </div>
            <div>
               <label htmlFor="email">Email</label>
               <input type="text" name="email" value={email} onChange={handleChange}/>
            </div>
            <div>
               <label htmlFor="password">Password</label>
               <input type="password" name="password" value={password} onChange={handleChange}/>
            </div>
            {error ? <p>{error}</p>: null}
            <div>
                <button disabled={loading}> Register</button>
               
            </div>
           </form>
       </section>
    );
};
export default Register ;