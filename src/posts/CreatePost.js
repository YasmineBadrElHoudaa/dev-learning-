import React, { useEffect } from "react";
import {useState} from "react"
import { auth , storage } from "../firebase-config";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

import { setDoc, doc, addDoc,collection , Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import {  useNavigate } from "react-router-dom";
import { getDownloadURL, ref , uploadBytes, uploadBytesResumable } from "firebase/storage";
function CreatePost () {
    const [img , setImg] = useState("");
    const [progress , setProgress] = useState({})  ;
    const { user } = useContext(AuthContext) ;
    const Navigate = useNavigate();
   console.log(img);
   useEffect(() => {
    if (img) {
        const uploadImg = async ()  => {
            const imgRef = ref(storage , `avatar/${new Date().getTime()} - ${img.name}`) ;
            const snap =  await uploadBytes(imgRef , img) ;
            const url = await getDownloadURL(ref(storage , snap.ref.fullPath))
            console.log(snap.ref.fullPath)
            console.log(url);
            await updateDoc(doc(db , "users" ,user.uid) ,{
                avatar: url , 
                avatarpath: snap.ref.fullPath
            }) ;
            setImg("");
        } ;
        uploadImg()
        }

   } , [img])

    const [data , setData] = useState({
        produit: "",
        details: "",
      
    });
    const  [ok , setOk] = useState(false);
    const { produit, details} = data ;
    const handleChange = e => {
        

        setData({...data, [e.target.name] : e.target.value})
    };
    const handleSubmit = async (e) => {
        e.preventDefault() ;
          setData({ ...data, error:null, loading: true}) ;
        if (!produit || !details  ){
            setData({...data, error: "All fields are required"}) ;
        }
            try{

                
               /* await setDoc(doc(db, 'pubsss',user.email) , {
                
                
                produit,
                details,
                
                createdAt: Timestamp.fromDate(new Date()),
                    });*/
                    const postsCollectionRef = collection(db, "pubsss");
                   
                    const string = "log in "+ Timestamp.fromDate(new Date()) ;
                     console.log(data) ;
                    await addDoc(postsCollectionRef, {
                        produit,
                        details,
                       email: user.email,
                       createdAt: Timestamp.fromDate(new Date()),
                      });
                    setData({
                        produit:"",
                        details:"",
                       
                        error: null,
                        loading: false,
                    });
                    console.log(data);
                    setOk(true);
                 
                   
                   

                   
                         
                    Navigate("/") ;
            }catch(error){
                setData({...data, error: error.message, loading: false})
            };

        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
               <input  type="file" id="photo" onChange={(e)=> setImg(e.target.files[0])}/>
        <label> produit</label>
        <input type="text" name="produit" value={produit} onChange={handleChange}/>
        <label> details</label>

       < input type="text" name="details" value={details} onChange={handleChange}/>
       <button  disabled={progress !== null && progress < 100}> creer</button>
       <h2>{ Date()}</h2>
       
     </form>
       </div>
    )
} ;
export default CreatePost