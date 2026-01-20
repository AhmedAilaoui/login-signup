import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.js";
import LoginPage from "./pages/LoginPage.js";
import SubscribePage from "./pages/SubscribePage.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/subscribe" element={<SubscribePage />} />
    </Routes>
  );
}

export default App;
