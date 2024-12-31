import { BrowserRouter as Router , Routes , Route , Link , Navigate } from 'react-router-dom';
import './App.css';
import { useContext, useState } from 'react';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Profil from './pages/Profil';
import { AuthContext } from './context/AuthContext';
import Pprojet from './posts/Pprojet';
import Pevenement from './posts/Pevenement';
import Pemploi from './posts/Pemploi';
import Ppublicité from './posts/Ppublicité';
import AuthProvider from './context/AuthContext';
import CreatePost from './posts/CreatePost';
import Myhistory from './pages/Myhistory';
import CookieConsent from 'react-cookie-consent';



function App() {
 
  
  return (
<AuthProvider>
  <Router>
    <Navbar/>
    <Routes>
      <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/register" element={<Register/>}/>
    <Route exact path="/createEmploi" element={<Pemploi/>}/>
    <Route exact path="/createprojet" element={<Pprojet/>}/>
    <Route exact path="/createevents" element={<Pevenement/>}/>
    <Route exact path="/createpubs" element={<Ppublicité/>}/>
    <Route exact path="/CreatePost" element={<CreatePost/>}/>
    <Route exact path="/myhistory" element={<Myhistory/>}/>
    
    
    

     <Route exact path="/profile" element={<Profil/>}/>
      <Route exact path="/" element={<Home/>}/>
    </Routes>
  </Router>
  <CookieConsent 
  debug={true} 
  location="top"
  style={{background: '#000' , textAlign:"left"}}  
  > this site uses cookies  .
  </CookieConsent>
  </AuthProvider>
 
  );
}

export default App;
