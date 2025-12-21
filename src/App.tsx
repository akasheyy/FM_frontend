import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import FullGallery from "./pages/FullGallery";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Full Gallery Page */}
        <Route path="/gallery" element={<FullGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
