import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Launch from "./pages/Launch";
import Ops from "./pages/Ops";
import Market from "./pages/Market";
import TokenDetail from "./pages/TokenDetail";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/launch" element={<Launch />} />
          <Route path="/ops" element={<Ops />} />
          <Route path="/market" element={<Market />} />
          <Route path="/token/:address" element={<TokenDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}
