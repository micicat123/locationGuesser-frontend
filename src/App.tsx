import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/signin.";
import Signup from "./pages/signup";
import HomePage from "./pages/home-page";
import AddLocation from "./pages/location/add-location";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/add-location" element={<AddLocation />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
