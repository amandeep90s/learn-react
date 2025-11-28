import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import DashboardStats from "./pages/DashboardStats";
import DashboardSettings from "./pages/DashboardSettings";
import NotFound from "./pages/NotFound";
import DateRangeForm from "./components/DateRangeForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="stats" element={<DashboardStats />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>
          <Route path="/date-form" element={<DateRangeForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
