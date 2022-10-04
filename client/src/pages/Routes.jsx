import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import LandingPage from "./LandingPage";
import About from "./About";
import Login from "./Login";


export default function Routess() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        {/* <Route
            exact
            path="/charity/:username"
            component={CharityDetails}
          />
          <Route exact path="/admin" component={Admin} />
          <Route
            exact
            path="/ngoDetailForAdmin"
            component={NgoDetailForAdmin}
          /> */}
      </Routes>
    </div>
  );
}
