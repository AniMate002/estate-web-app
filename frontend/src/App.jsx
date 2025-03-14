import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import PropertyDetails from "./pages/PropertyDetails";
import "./App.css"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useAuth } from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage/LoginPage";


function App() {
  const { authUser, setAuthUser }= useAuth()

  const getAuth = async () => {
    console.log("USER")
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      console.log("AUTH USER: ", data);
      if("error" in data) throw new Error(data.error);
      setAuthUser(data);
    } catch (e) {
      console.log("Error while trying to login: ", e.message);
    }
  }

  useEffect(() => {
    getAuth()
  }, [])

  return (
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </Router>
  );
}

export default App;
