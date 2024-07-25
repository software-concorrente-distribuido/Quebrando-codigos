import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/index";
import VideoPlayer from "./pages/player";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/player/:id" element={<VideoPlayer />} />
        </Routes>
    </Router>
  );
};

export default App;