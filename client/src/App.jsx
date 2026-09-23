import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TemplateTest from "./pages/TemplateTest";
import PublicPortfolio from "./pages/PublicPortfolio";
import ResumeBuilder from "./pages/ResumeBuilder";
import PublicResume from "./pages/PublicResume";

import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>

        <Routes>

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/template-test"
            element={<TemplateTest />}
          />

          <Route
            path="/resume-builder"
            element={<ResumeBuilder />}
          />

          {/* PUBLIC RESUME */}
          <Route
            path="/resume/:username"
            element={<PublicResume />}
          />

          {/* PUBLIC PORTFOLIO */}
          <Route
            path="/:username"
            element={<PublicPortfolio />}
          />

        </Routes>

      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;