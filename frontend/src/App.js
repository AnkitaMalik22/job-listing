import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import JobDesc from "./components/JobDesc/JobDesc";
import AddJob from "./components/AddJob/AddJob";
import React from "react";

function App() {
  const [user,setUser]=React.useState("")
  const [isAuthenticated ,setAuth]=React.useState(false)
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home user={user} isAuthenticated={isAuthenticated} />} />
        <Route exact path="/register" element={<Register setAuth={setAuth} setUser={setUser}/>} />
        <Route exact path="/login" element={<Login  setAuth={setAuth} setUser={setUser} />} />
        <Route path="/job/:id" element={<JobDesc />} />
        <Route path="/job/add" element={<AddJob />} />
      </Routes>
    </div>
  );
}

export default App;
