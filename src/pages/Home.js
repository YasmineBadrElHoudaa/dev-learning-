
import React , {useContext , useState, useEffect} from "react" ;
import { AuthContext } from "../context/AuthContext";
import { db} from "../firebase-config" ;
import { collection , getDocs} from "firebase/firestore" ;
function Home (){
    const { user } = useContext(AuthContext) ;
    const [users , setUsers ] = useState([]) ;
    const [myquery, setQuery] = useState("") ;
    
    const usersRef = collection(db, 'users')
    useEffect(()=> {
        const getUsers = async () => {
           const  data = await getDocs(usersRef) ;
            setUsers(data.docs.map((doc) => ({...doc.data() ,id : doc.id}))) ;
            
        };
        getUsers() ;
        
    })
    

   /* useEffect (() => {
        const fetchData = async () => {
            let list = [] ;
           try{ const querySnapshot = await getDocs(collection(db , "pubsss")) ;
            querySnapshot.forEach((doc) => {
                list.push({ id : doc.id ,...doc.data()}) ;
               
            }) ;
            console.log(list) ; 
        }catch(error) {
            console.log(error) ;
        }
        
        } ;

        fetchData() 
} , []) ; */
    return (
        
        <div>
            <h1> Home </h1>
            
            {users.map((one) => {
                return (
                  <div>
                    <img src={one.avatar} alt="avatar"/>

                   <div> <h4> name : { one.name}</h4> </div>
                   
                    <div> <h4> email : {one.email} </h4></div>



                    </div>
                    
                 
                    
                   
                    
                    
                )
            })}

        </div>
        
    ) ;
}

export default Home ;