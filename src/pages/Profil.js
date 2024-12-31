import React , {useEffect, useState ,useContext} from "react";
import Camera from "../Components/svg/Camera";
import { storage } from "../firebase-config";
import {ref , getDownloadURL , uploadBytes} from 'firebase/storage' ;
import { db, auth } from "../firebase-config" ;
import { AuthContext } from "../context/AuthContext";
import { collection , query , where, onSnapshot, getDocs, doc , deleteDoc , updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
const Profil = () => {
    const { user } = useContext(AuthContext) ;
    const [pubs, setPubs] = useState([]) ;
    const [name,setname] = useState("");
   
    
    
    
    useEffect(() => {
        const Myuser = collection(db, 'users')
        //create the query
        const q = query(Myuser , where("email" , "==" , user.email));
        //execute code
        const unsub = onSnapshot(q,(querySnapshot)=> {
            let pubs = [] ;
            querySnapshot.forEach((doc) => {
                pubs.push(doc.data());
            });
            setPubs(pubs) ;
        });
        return () => unsub() ;

    }, []);
    console.log(pubs);
    const updateProfile = async (id) => {
        const userDoc = doc(db, "users", id);
        const newFields = {name : name};
        await updateDoc(userDoc, newFields);
      };

    
    /*    <div> <h4> name : {one.email} </h4></div>
                    <div> <h4> email : { one.name}</h4> </div>
                    <div> <h4> password : { one.password}</h4> </div>
                    <div> <h4> id : { one.uid}</h4> </div>*/




    return (
       
        <div>
            <h1> Profil </h1> 
            
            {pubs.map((one) => {
                return (
                  <div>

<div>
               <label htmlFor="email">Email</label>
               <input type="text" name="email" value={one.email} 
               />
            </div>
            <div>
               <label htmlFor="name">name</label>
               <input  placeholder={one.name} type="text" name={one.name}   />
            </div>
            <div>
               <label htmlFor="password">password</label>
               <input type="text" name="password" value={one.password} />
            </div>
                   
                <button onClick= {() => updateProfile(one.uid)}>update</button>



                    </div>
                    
                 
                    
                   
                    
                    
                )
            })}
          
                    
                 
                    
                   
                    
                    
              

        </div>
    )


} ;
export default Profil ;