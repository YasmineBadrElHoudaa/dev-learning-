import'./pemploi.css'  
import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import React , {useState} from "react";
import { auth } from "../firebase-config";

import { setDoc, doc, Timestamp , addDoc , collection } from "firebase/firestore";
import { db } from "../firebase-config";
import {  useNavigate } from "react-router-dom";

function Pemploi (){ 
  const { user } = useContext(AuthContext) ; 
  const [data , setData] = useState({
    inputdomaine4: "",
    inputheure2: "",
    inputlocation5: "",
    inputsalaire:"",
    Textarea3:"",
    Textarea4:"",
    error:null,
    loading: false,
});
const Navigate = useNavigate();
const { inputdomaine4, inputheure2, inputlocation5,inputsalaire, Textarea3, Textarea4,error, loading} = data ;
const handleChange = e => {
    setData({...data, [e.target.name] : e.target.value})
};
const handleSubmit = async (e) => {
    e.preventDefault() ;
    setData({ ...data, error:null, loading: true}) ;
    if (!inputdomaine4 || !inputheure2 || !inputlocation5 || !inputsalaire || !Textarea3 || !Textarea4 ){
        setData({...data, error: "All fields are required"}) ;
    }
        try{
          const EmploiCollectionRef = collection(db, "pubs");
          
            await addDoc(EmploiCollectionRef, {
            email: user.email,
            inputdomaine4,
            inputheure2,
            inputlocation5,
            inputsalaire,
            Textarea3,
            Textarea4,
            createdAt: Timestamp.fromDate(new Date()),
                });
                setData({
                  inputdomaine4:"",
                  inputheure2:"",
                  inputlocation5:"",
                  inputsalaire:"",
                  Textarea3:"",
                  Textarea4:"",
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
    <form action="a" class="border border-dark" id="form6" onSubmit={handleSubmit} >
      <div class="d-flex">
        <img src="Images/R.jpg" id="imag5"></img>
        <div>
          <h3 id="name5">{user.email}</h3>
          <p id="temps5">26/05/2022, 12:26 AM</p>
        </div>
      </div>
      <div class="d-flex">
        <label for="inputdomaine4" id="domain">Domaine: </label>
        <input type="text" class="form-control" id="inputdomaine4"  name="inputdomaine4" value={inputdomaine4} onChange={handleChange}></input>
        <label for="inputheure2" id="heure2">Heures: </label>
        <input type="text" class="form-control" id="inputheure2"  name="inputheure2" value={inputheure2} onChange={handleChange}></input>
      </div>
      <div class="d-flex">
        <label for="inputlocation5" >Localisation: </label>
        <input type="adresse" class="form-control" id="inputlocation5"  name="inputlocation5" value={inputlocation5} onChange={handleChange}></input>
        <label for="inputsalaire" id="salaire">Salaire: </label>
        <input type="adresse" class="form-control" id="inputsalaire"  name="inputsalaire" value={inputsalaire} onChange={handleChange}></input>
      </div>
      <div class="mb-3">
        <label for="Textarea3" class="form-label">Responsabilités du poste: </label>
        <textarea class="form-control" id="Textarea3" rows="3"  name="Textarea3" value={Textarea3} onChange={handleChange}></textarea>
      </div>
      <div class="mb-3">
        <label for="Textarea4" class="form-label">Exigences de l emploi: </label>
        <textarea class="form-control" id="Textarea4" rows="3"  name="Textarea4" value={Textarea4} onChange={handleChange}></textarea>
      </div>
      <br></br><br></br>
    </form>
    <button type="button"  class="btn btn-primary" id="butt5">Publier</button>
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
export default Pemploi;