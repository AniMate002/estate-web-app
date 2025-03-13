import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import PropertyDetails from "./pages/PropertyDetails";
import "./App.css"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
