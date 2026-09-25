import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TemplateTest from "./pages/TemplateTest";
import PublicPortfolio from "./pages/PublicPortfolio";
import Register from "./pages/Register";
import ResumeBuilder from "./pages/ResumeBuilder";
import PublicResume from "./pages/PublicResume";

import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* Authentication */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Templates */}
          <Route
            path="/template-test"
            element={<TemplateTest />}
          />

          {/* Resume */}
          <Route
            path="/resume-builder"
            element={<ResumeBuilder />}
          />

          <Route
            path="/resume/:username"
            element={<PublicResume />}
          />

          {/* Public Portfolio */}
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