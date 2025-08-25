import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Droplets, Sun, Scissors, AlertTriangle, Plus, Heart } from 'lucide-react';

const PlantHealthDashboard: React.FC = () => {
  const { userData, updatePlant, addPlant } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: '',
    type: '',
    location: '',
    health: 'good' as const,
    lastWatered: new Date().toISOString().split('T')[0],
    nextWatering: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const waterPlant = (plantId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    updatePlant(plantId, {
      lastWatered: today,
      nextWatering: nextWeek
    });
  };

  const handleAddPlant = (e: React.FormEvent) => {
    e.preventDefault();
    addPlant(newPlant);
    setNewPlant({
      name: '',
      type: '',
      location: '',
      health: 'good',
      lastWatered: new Date().toISOString().split('T')[0],
      nextWatering: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const plantsNeedingWater = userData.plants.filter(plant => 
    new Date(plant.nextWatering) <= new Date()
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Plant Health Dashboard</h2>
          <p className="text-gray-600">Monitor and care for your green family</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Plant</span>
        </button>
      </div>

      {/* Alerts */}
      {plantsNeedingWater.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="text-yellow-600" size={20} />
            <h3 className="font-semibold text-yellow-800">Watering Reminders</h3>
          </div>
          <p className="text-yellow-700">
            {plantsNeedingWater.length} plant(s) need watering: {plantsNeedingWater.map(p => p.name).join(', ')}
          </p>
        </div>
      )}

      {/* Plants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {userData.plants.map((plant) => (
          <div key={plant.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{plant.name}</h3>
                <p className="text-gray-600 text-sm">{plant.type}</p>
                <p className="text-gray-500 text-xs">{plant.location}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getHealthColor(plant.health)}`}>
                {plant.health}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="text-blue-500" size={16} />
                  <span className="text-sm text-gray-600">Last watered</span>
                </div>
                <span className="text-sm font-medium">{plant.lastWatered}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sun className="text-yellow-500" size={16} />
                  <span className="text-sm text-gray-600">Next watering</span>
                </div>
                <span className="text-sm font-medium">{plant.nextWatering}</span>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => waterPlant(plant.id)}
                  className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-md text-sm flex items-center justify-center space-x-1 transition-colors"
                >
                  <Droplets size={14} />
                  <span>Water</span>
                </button>
                <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-md text-sm flex items-center justify-center space-x-1 transition-colors">
                  <Scissors size={14} />
                  <span>Prune</span>
                </button>
                <button className="bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-2 rounded-md text-sm flex items-center justify-center transition-colors">
                  <Heart size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Plant Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Add New Plant</h3>
            <form onSubmit={handleAddPlant} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plant Name</label>
                <input
                  type="text"
                  value={newPlant.name}
                  onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plant Type</label>
                <input
                  type="text"
                  value={newPlant.type}
                  onChange={(e) => setNewPlant({ ...newPlant, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newPlant.location}
                  onChange={(e) => setNewPlant({ ...newPlant, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Plant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Care Tips */}
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-semibold text-green-800 mb-2">💡 Today's Care Tip</h3>
        <p className="text-green-700 text-sm">
          Check your plants' soil moisture by inserting your finger 1-2 inches deep. 
          If it's dry, it's time to water. Different plants have different watering needs!
        </p>
      </div>
    </div>
  );
};

export default PlantHealthDashboard;