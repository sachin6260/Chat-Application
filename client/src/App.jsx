 import React from 'react'
 import {BrowserRouter,Routes,Route } from "react-router-dom" 
import Register from './pages/Register'
import Chet from './pages/Chet'
import Login from './pages/Login'
import SetAvatar from './components/SetAvatar'
  const App = () => {
   return (
     <BrowserRouter>
     <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path ="/"  element={<Chet/>}/>
      <Route path ="/login"  element={<Login/>}/>
      <Route path ="/setavatar"  element={<SetAvatar/>}/>

 
    
 



     </Routes>
       
     </BrowserRouter>
   )
 }
 
 export default App
 