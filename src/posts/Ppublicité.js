import'./ppublicité.css' 
import React , {useState} from "react";
import { auth } from "../firebase-config";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

import { setDoc, doc, Timestamp , addDoc , collection } from "firebase/firestore";
import { db } from "../firebase-config";
import {  useNavigate } from "react-router-dom";
function Ppublicité (){  
    const { user } = useContext(AuthContext) ;
    const [data , setData] = useState({
        inputlocation: "",
        inputprix: "",
        inputproduit: "",
        myinput: "",
        inputdeplace:"",
        error:null,
        loading: false,
    });
    const Navigate = useNavigate();
    const { inputlocation, inputprix, inputproduit, myinput, inputdeplace,loading,error} = data ;
    const handleChange = e => {
        setData({...data, [e.target.name] : e.target.value})
    };
    const handleSubmit = async (e) => {
        e.preventDefault() ;
       

        console.log(data) ;
       setData({ ...data, error:null, loading: true}) ;
        if (!inputlocation || !inputprix || !inputdeplace || !myinput || !inputproduit ){
            setData({...data, error: "All fields are required"}) ;
        }
            try{
                const PubsCollectionRef = collection(db, "pubs");
                
                await addDoc(PubsCollectionRef , {
                inputlocation,
                inputprix,
                myinput,
                inputproduit,
                inputdeplace,
                email: user.email,

                createdAt: Timestamp.fromDate(new Date()),
                    });
                    setData({
                        inputlocation:"",
                        inputprix:"",
                        inputproduit:"",
                        myinput:"",
                        inputdeplace:"",
                        error: null,
                        loading: false,
                    });
                    console.log(data);
                    Navigate("/") ;
            }catch(error){
                setData({...data, error: error.message, loading: false})
            };
       
    } ;
  
    return(
        
    <div>
              {user ? (
                    <>
      <form  className="border border-dark" id="form2" onSubmit={handleSubmit}>
          <div className="d-flex">
              <img src="Images/R.jpg" id="imag2"></img>
              <div>
                  
                  <h3 id="name2">{user.email}</h3>

                  <p id="temps2">26/05/2022, 12:26 AM</p>
              </div>
          </div>
          <div className="d-flex" id="L2">
              <label htmlFor="inputlocation2">Localisation: </label>
              <input type="text" className="form-control" id="inputlocation2"name="inputlocation" value={inputlocation} onChange={handleChange}></input>
          </div><br></br>
          <div className="d-flex" >
              <label htmlFor="inputproduit" id="produit">Produit: </label>
              <input type="text" className="form-control" id="inputproduit" name="inputproduit" value={inputproduit} onChange={handleChange}></input>    
              <label htmlFor="inputprix" id="prix">Prix: </label>
              <input type="text" className="form-control" id="inputprix" name="inputprix" value={inputprix} onChange={handleChange}></input>
              <span id="da2">DA</span>
          </div><br></br>
          <span id="images">Images:</span><br></br>
          <button id="tch2"></button>
          <button id="tch3">+</button><br></br><br></br>
          <div className="d-flex">
              <span>Livraison: </span>&nbsp;
              <div>
                  <label htmlFor="no2">Non</label>&nbsp;
                  <input type="radio" name="myinput" id="no2" value={myinput} onChange={handleChange}></input>
              </div>&nbsp;
              <div>
                  <label htmlFor="yes2">Oui</label>&nbsp;
                  <input type="radio" name="myinput" id="yes2"  value={myinput} onChange={handleChange}></input>
                  <div className="deplace" > 
                      <label htmlFor="inputdeplace">Deplacements: </label>
                      <input type="text" className="form-control" id="inputdeplace" name="inputdeplace" value={inputdeplace} onChange={handleChange}></input>
                  </div>
              </div>
          </div>
          {error ? <p>{error}</p>: null}
          <button type="button"  className="btn btn-primary" id="butt2" >Publier</button>
         
      </form>
      
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
  export default Ppublicité;