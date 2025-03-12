import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import PropertyDetails from "./pages/PropertyDetails";


function App() {


  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
    </Router>
  );
}

export default App;
