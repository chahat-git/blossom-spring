import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { Leaf, Droplets, Wind, TrendingUp } from 'lucide-react';

const EcoImpactTracker: React.FC = () => {
  const { userData } = useUser();
  const { ecoImpact } = userData;

  const impacts = [
    {
      icon: <Wind className="text-green-600" size={32} />,
      label: 'CO₂ Offset',
      value: `${ecoImpact.co2Offset} kg`,
      description: 'Carbon dioxide absorbed by your plants',
      color: 'bg-green-50 border-green-200',
      progress: (ecoImpact.co2Offset / 50) * 100 // assuming 50kg target
    },
    {
      icon: <Leaf className="text-blue-600" size={32} />,
      label: 'Oxygen Produced',
      value: `${ecoImpact.oxygenProduced} kg`,
      description: 'Fresh oxygen generated daily',
      color: 'bg-blue-50 border-blue-200',
      progress: (ecoImpact.oxygenProduced / 20) * 100 // assuming 20kg target
    },
    {
      icon: <Droplets className="text-teal-600" size={32} />,
      label: 'Water Filtered',
      value: `${ecoImpact.waterSaved} L`,
      description: 'Air humidity improvement',
      color: 'bg-teal-50 border-teal-200',
      progress: (ecoImpact.waterSaved / 100) * 100 // assuming 100L target
    }
  ];

  const monthlyData = [
    { month: 'Jan', co2: 8.2, oxygen: 5.1, water: 32 },
    { month: 'Feb', co2: 9.1, oxygen: 5.8, water: 35 },
    { month: 'Mar', co2: 10.5, oxygen: 6.3, water: 38 },
    { month: 'Apr', co2: 11.8, oxygen: 7.2, water: 42 },
    { month: 'May', co2: 12.5, oxygen: 8.2, water: 45 }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Environmental Impact</h2>
          <p className="text-gray-600">Track your positive contribution to the planet</p>
        </div>
        <div className="bg-green-100 px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="text-green-800 font-semibold">+15% this month</span>
          </div>
        </div>
      </div>

      {/* Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {impacts.map((impact, index) => (
          <div key={index} className={`border rounded-lg p-6 ${impact.color}`}>
            <div className="flex items-center justify-between mb-4">
              {impact.icon}
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{impact.value}</div>
                <div className="text-sm font-medium text-gray-700">{impact.label}</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{impact.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(impact.progress, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Trend</h3>
        <div className="grid grid-cols-5 gap-4">
          {monthlyData.map((data, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-lg p-4 mb-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <div
                      className="w-4 bg-green-500 rounded"
                      style={{ height: `${(data.co2 / 15) * 40 + 10}px` }}
                    ></div>
                    <div
                      className="w-4 bg-blue-500 rounded ml-1"
                      style={{ height: `${(data.oxygen / 10) * 40 + 10}px` }}
                    ></div>
                    <div
                      className="w-4 bg-teal-500 rounded ml-1"
                      style={{ height: `${(data.water / 50) * 40 + 10}px` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700">{data.month}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">CO₂</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Oxygen</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-teal-500 rounded"></div>
            <span className="text-sm text-gray-600">Water</span>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Environmental Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-sm font-medium text-green-800">Green Starter</div>
            <div className="text-xs text-green-600">First plant added</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">💧</div>
            <div className="text-sm font-medium text-blue-800">Water Saver</div>
            <div className="text-xs text-blue-600">10L water filtered</div>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg opacity-50">
            <div className="text-2xl mb-2">🌍</div>
            <div className="text-sm font-medium text-gray-600">Carbon Fighter</div>
            <div className="text-xs text-gray-500">25kg CO₂ offset</div>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg opacity-50">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-sm font-medium text-gray-600">Eco Champion</div>
            <div className="text-xs text-gray-500">50kg CO₂ offset</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoImpactTracker;