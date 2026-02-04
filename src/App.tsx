import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import DesignerPage from './pages/DesignerPage';
import CommunityPage from './pages/CommunityPage';
import ContactPage from './pages/ContactPage';
import MembershipPage from './pages/MembershipPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Chatbot from './components/common/Chatbot';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-green-50">
            <Navbar />
            <Routes>
              <Route path="/blossom-spring/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/designer" element={<DesignerPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
             
            </Routes>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;