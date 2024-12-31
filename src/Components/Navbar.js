import React , {useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config" ;
import { signOut } from "firebase/auth";
import { setDoc, doc, addDoc,collection , Timestamp, updateDoc } from "firebase/firestore";

import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase-config";


const Navbar = () => {
    const { user } = useContext(AuthContext) ;
    const Navigate = useNavigate();
    const  handleHistory = async () => {
        const historyCollectionRef = collection(db, "history");

        await addDoc(historyCollectionRef, {
            signOut:  Timestamp.fromDate(new Date()),     
                        
            email: user.email
            
           });
        Navigate("/profile");

    }
    
   
    const handleSignout = async () => {
        await signOut(auth) ;
        
       
        Navigate("/login");
    };
    return (
        <nav>
            <h3> <Link to="/"> Messenger </Link> </h3>
            <div>
                {user ? (
                    <>
            <Link to="/Createemploi">create emploi .....</Link>
            <Link to="/Createpubs">create Pubs ....</Link>
            <Link to="/Createevents">create events....</Link>
            <Link to="/Createprojet">create Projet ....</Link>
            <Link to="/myhistory">myhistory....</Link>
            <Link to="/CreatePost">createposts....</Link>
            
            <button onClick={handleHistory}>historyAdd</button>
                <Link to="/profile"> profile</Link>
                
                <button onClick={handleSignout}>logOut</button>
              </> 
                ) : (
                    <>
               
              
                <Link to ="/register">Register</Link>
                <Link to ="/Login">login</Link>
             </>
                )}
            </div>
        </nav>

    );
} ;
export default Navbar ;