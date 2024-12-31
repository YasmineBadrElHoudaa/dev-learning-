import'./pEvenement.css' 
import { AuthContext } from "../context/AuthContext"; 
import { useContext } from 'react';
import { Link } from 'react-router-dom';


import React , {useState} from "react";
import { auth } from "../firebase-config";

import { setDoc, doc, Timestamp , addDoc , collection } from "firebase/firestore";
import { db } from "../firebase-config";
import {  useNavigate } from "react-router-dom";

function Pevenement (){  
    const { user } = useContext(AuthContext) ;
    const [data , setData] = useState({
        inputdomaine2: "",
        inputdate2: "",
        inputlocation3: "",
        inputheure: "",
        error:null,
        loading: false,
    });
    const Navigate = useNavigate();
    const { inputdomaine2, inputdate2, inputlocation3,inputheure, error, loading} = data ;
    const handleChange = e => {
        setData({...data, [e.target.name] : e.target.value})
    };
    const handleSubmit = async (e) => {
        e.preventDefault() ;
        setData({ ...data, error:null, loading: true}) ;
        if (!inputdomaine2 || !inputdate2 || !inputlocation3 || !inputheure){
            setData({...data, error: "All fields are required"}) ;
        }
            try{

                const EventCollectionRef = collection(db, "pubs");
              
                await addDoc(EventCollectionRef , {
                email: user.email,
                inputdomaine2,
                inputdate2,
                inputlocation3,
                inputheure,
                createdAt: Timestamp.fromDate(new Date()),
                    });
                    setData({
                        inputdomaine2:"",
                        inputdate2:"",
                        inputlocation3:"",
                        inputheure:"",
                        error: null,
                        loading: false,
                    });
                    Navigate("/") ;
            }catch(error){
                setData({...data, error: error.message, loading: false})
            };
       
    } ;
  
  return(
  <div>
      {user ? (
                    <>
    <form  class="border border-dark" id="form4" onSubmit={handleSubmit}>
        <div class="d-flex">
            <img src="Images/R.jpg" id="imag3"></img>
            <div>
                <h3 id="name3">{user.email}</h3>
                
            </div>
        </div>
        <div class="d-flex" >
            <label for="inputdomaine2">Domaine: </label>
            <input type="text" class="form-control" id="inputdomaine2" name="inputdomaine2" value={inputdomaine2} onChange={handleChange}></input>    
            <label for="inputdate2" id="date">Date: </label>
            <input type="text" class="form-control" id="inputdate2" name="inputdate2" value={inputdate2} onChange={handleChange}></input>
        </div>
        <div class="d-flex" >
            <label for="inputlocation3">Localisation: </label>
            <input type="text" class="form-control" id="inputlocation3" name="inputlocation3" value={inputlocation3} onChange={handleChange}></input>
            <label for="inputheure" id="heure">Heure: </label>
            <input type="text" class="form-control" id="inputheure" name="inputheure" value={inputheure} onChange={handleChange}></input>
        </div><br></br>
        <span id="agenda">Agenda: </span><br></br><br></br>
        <button id="tch4"></button>
        <br></br>
    </form>
    <button type="button"  class="btn btn-primary " id="butt3">Publier</button>
    </> 
    ) : (
        <>
   
     
    <Link to ="/register">Register</Link>
    <Link to ="/Login">login</Link>
 </>
    )}
</div>
);
}
export default Pevenement;