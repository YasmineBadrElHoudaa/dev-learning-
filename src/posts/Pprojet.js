import'./pprojet.css'  
import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';

import React , {useState} from "react";
import { auth } from "../firebase-config";
import { Link } from 'react-router-dom';
import { setDoc, doc, Timestamp , addDoc , collection } from "firebase/firestore";
import { db } from "../firebase-config";
import {  useNavigate } from "react-router-dom";

function Pprojet () {  
  const { user } = useContext(AuthContext) ;
  const [data , setData] = useState({
    inputdomaine3: "",
    inputentreprise2: "",
    inputlocation4: "",
    inputdate3: "",
    Textarea2: "",
    error:null,
    loading: false,
});
const Navigate = useNavigate();
const { inputdomaine3, inputentreprise2, inputlocation4,inputdate3,Textarea2, error, loading} = data ;
const handleChange = e => {
    setData({...data, [e.target.name] : e.target.value})
};
const handleSubmit = async (e) => {
    e.preventDefault() ;
    setData({ ...data, error:null, loading: true}) ;
    if (!inputdomaine3 || !inputentreprise2 || !inputlocation4 || !inputdate3 || !Textarea2){
        setData({...data, error: "All fields are required"}) ;
    }
        try{
          const ProjetCollectionRef = collection(db, "pubs");
          
            await addDoc(ProjetCollectionRef , {
            email: user.email,
            inputdomaine3,
            inputentreprise2,
            inputlocation4,
            inputdate3,
            Textarea2,
            createdAt: Timestamp.fromDate(new Date()),
                });
                setData({
                  inputdomaine3:"",
                  inputentreprise2:"",
                  inputlocation4:"",
                  inputdate3:"",
                  Textarea2:"",
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
    <form  class="border border-dark" id="form5" onSubmit={handleSubmit}>
        <div class="d-flex">
          <img src="Images/R.jpg" id="imag4"></img>
          <div>
            <h3 id="name4">{user.email}</h3>
            <p id="temps4">26/05/2022, 12:26 AM</p>
          </div>
        </div>
        <div class="d-flex" >
          <label for="inputdomaine3">Domaine: </label>
          <input type="text" class="form-control" id="inputdomaine3" name="inputdomaine3" value={inputdomaine3} onChange={handleChange}></input>
          <label for="inputentreprise2">Taille d'entreprise: </label>
          <input type="text" class="form-control" id="inputentreprise2" name="inputentreprise2" value={inputentreprise2} onChange={handleChange}></input>
        </div>
        <div class="d-flex" >
          <label for="inputlocation4">Localisation: </label>
          <input type="adresse" class="form-control" id="inputlocation4" name="inputlocation4" value={inputlocation4} onChange={handleChange}></input>
          <label for="inputdate3">Date de début: </label>
          <input type="text" class="form-control" id="inputdate3" name="inputdate3" value={inputdate3} onChange={handleChange}></input>
        </div><br></br><br></br>
        <div class="mb-3">
            <label for="Textarea2" class="form-label">Services nécessaires: </label>
            <textarea class="form-control" id="Textarea2" rows="3" name="Textarea2" value={Textarea2} onChange={handleChange}></textarea>
          </div>
          <br></br><br></br>
         
    </form>
    <button type="button"  class="btn btn-primary " id="butt4">Publier</button>

    
      
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
export default Pprojet;