import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import PlantHealthDashboard from '../components/dashboard/PlantHealthDashboard';
import EcoImpactTracker from '../components/dashboard/EcoImpactTracker';
import ServiceSchedule from '../components/dashboard/ServiceSchedule';
import GamificationPanel from '../components/dashboard/GamificationPanel';
import { Leaf, Award, Calendar, BarChart3 } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { userData } = useUser();
  const [activeTab, setActiveTab] = useState('plants');

  const tabs = [
    { id: 'plants', label: 'My Plants', icon: <Leaf size={20} /> },
    { id: 'eco', label: 'Eco Impact', icon: <BarChart3 size={20} /> },
    { id: 'services', label: 'Services', icon: <Calendar size={20} /> },
    { id: 'rewards', label: 'Rewards', icon: <Award size={20} /> }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Please log in to access your dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 🌱
          </h1>
          <div className="flex items-center space-x-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {user.membershipTier} Member
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              {user.greenPoints} Green Points
            </span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Leaf className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{userData.plants.length}</p>
                <p className="text-gray-600 text-sm">Plants</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BarChart3 className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{userData.ecoImpact.co2Offset}kg</p>
                <p className="text-gray-600 text-sm">CO₂ Offset</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{userData.services.length}</p>
                <p className="text-gray-600 text-sm">Services</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="text-yellow-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{user.greenPoints}</p>
                <p className="text-gray-600 text-sm">Points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'plants' && <PlantHealthDashboard />}
          {activeTab === 'eco' && <EcoImpactTracker />}
          {activeTab === 'services' && <ServiceSchedule />}
          {activeTab === 'rewards' && <GamificationPanel />}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;