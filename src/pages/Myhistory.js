import React  , { useContext ,useEffect, useState} from "react" ;
import { db, auth } from "../firebase-config" ;
import { AuthContext } from "../context/AuthContext";

import { collection , query , where, onSnapshot, getDocs, doc , deleteDoc} from 'firebase/firestore';

function Myhistory () {
    const { user } = useContext(AuthContext) ;
    const [pubs, setPubs] = useState([]) ;
    const [myquery, setQuery] = useState("") ;
    console.log(myquery);
    useEffect(() => {
        const MyPubsRef = collection(db, 'pubsss')
        //create the query
        const q = query(MyPubsRef , where("email" , "==" , user.email));
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
   // console.log(pubs.filter(pub=>pub.produit.toLowerCase().includes('d1')));
    //console.log(pubs);
//method 2
    /* const [pubLists , setPubLists] = useState([]) ;
     const pubsCollectionRef = collection(db,"pubsss") ;
     useEffect(() => {
         const getPubs = async () => {
             const data =  await getDocs(pubsCollectionRef) ;
             setPubLists(data.docs.map((doc)=>({ ...doc.data(),id: doc.id})));
         };
         getPubs();
     }, [deletePub]) ;
     const deletePub = async (id) => {
         const pubDoc = doc(db,"pubsss", id) ;
         await deleteDoc(pubDoc);
     }; */


    return (
       
        <div>
            <h1> Home </h1> 
        <img src={user.avatar}/>
            <input type="text" placeholder="rechrche ..." className="search" onChange={(e)=> setQuery(e.target.value)} />
            {pubs.filter((pub)=>pub.produit.toLowerCase().includes(myquery) || pub.produit.toUpperCase().includes(myquery) ).map((pub) => {
                return (
                  <div>

                   
                   
                    <div> <h4> email : {pub.email} </h4></div>
                    <div> <h4> produit : { pub.produit}</h4> </div>
                    <div> <h4> details : { pub.details}</h4> </div>



                    </div>
                    
                 
                    
                   
                    
                    
                )
            })}

        </div>
    )
}
export default Myhistory ;  