import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Trophy, Star, Gift, Users, Leaf, Award } from 'lucide-react';

const GamificationPanel: React.FC = () => {
  const { user } = useAuth();

  const achievements = [
    {
      id: 1,
      icon: <Leaf className="text-green-500" size={24} />,
      title: 'Green Starter',
      description: 'Added your first plant',
      points: 10,
      unlocked: true,
      date: '2025-01-10'
    },
    {
      id: 2,
      icon: <Trophy className="text-yellow-500" size={24} />,
      title: 'Plant Parent',
      description: 'Successfully cared for 5 plants',
      points: 25,
      unlocked: true,
      date: '2025-01-12'
    },
    {
      id: 3,
      icon: <Star className="text-purple-500" size={24} />,
      title: 'Community Helper',
      description: 'Shared your first garden design',
      points: 15,
      unlocked: false,
      progress: 0
    },
    {
      id: 4,
      icon: <Users className="text-blue-500" size={24} />,
      title: 'Social Gardener',
      description: 'Refer 3 friends to join',
      points: 50,
      unlocked: false,
      progress: 1,
      target: 3
    },
    {
      id: 5,
      icon: <Award className="text-red-500" size={24} />,
      title: 'Eco Champion',
      description: 'Offset 50kg of CO₂',
      points: 100,
      unlocked: false,
      progress: 12.5,
      target: 50
    }
  ];

  const rewards = [
    {
      id: 1,
      name: 'Free Plant Delivery',
      points: 100,
      description: 'Get a free plant delivered to your door',
      available: true
    },
    {
      id: 2,
      name: '20% Discount',
      points: 150,
      description: 'Save 20% on your next service',
      available: true
    },
    {
      id: 3,
      name: 'Premium Designer Access',
      points: 200,
      description: '1-month free access to premium designer tools',
      available: false
    },
    {
      id: 4,
      name: 'Expert Consultation',
      points: 300,
      description: 'Free 1-hour consultation with plant expert',
      available: false
    }
  ];

  const currentLevel = Math.floor((user?.greenPoints || 0) / 50) + 1;
  const nextLevelPoints = currentLevel * 50;
  const progressToNext = ((user?.greenPoints || 0) % 50) / 50 * 100;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Green Points & Rewards</h2>
          <p className="text-gray-600">Earn points and unlock amazing rewards</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600">{user?.greenPoints || 0}</div>
          <div className="text-sm text-gray-600">Green Points</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Level {currentLevel}</h3>
            <p className="text-gray-600">Keep growing to reach Level {currentLevel + 1}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">{user?.greenPoints} / {nextLevelPoints} points</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressToNext}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Trophy className="text-yellow-500" size={24} />
            <span>Achievements</span>
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`border rounded-lg p-4 transition-all ${
                  achievement.unlocked
                    ? 'bg-white border-green-200 shadow-sm'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-medium ${
                        achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <span className={`text-sm font-medium ${
                        achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        +{achievement.points} pts
                      </span>
                    </div>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    {achievement.unlocked && achievement.date && (
                      <p className="text-xs text-green-600 mt-1">
                        Unlocked on {achievement.date}
                      </p>
                    )}
                    {!achievement.unlocked && achievement.target && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress: {achievement.progress}/{achievement.target}</span>
                          <span>{Math.round((achievement.progress / achievement.target) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Gift className="text-pink-500" size={24} />
            <span>Available Rewards</span>
          </h3>
          <div className="space-y-4">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className={`border rounded-lg p-4 ${
                  reward.available && (user?.greenPoints || 0) >= reward.points
                    ? 'bg-white border-green-200 shadow-sm'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`font-medium ${
                    reward.available && (user?.greenPoints || 0) >= reward.points
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}>
                    {reward.name}
                  </h4>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    reward.available && (user?.greenPoints || 0) >= reward.points
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {reward.points} pts
                  </span>
                </div>
                <p className={`text-sm mb-3 ${
                  reward.available && (user?.greenPoints || 0) >= reward.points
                    ? 'text-gray-600'
                    : 'text-gray-400'
                }`}>
                  {reward.description}
                </p>
                <button
                  disabled={!reward.available || (user?.greenPoints || 0) < reward.points}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    reward.available && (user?.greenPoints || 0) >= reward.points
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {(user?.greenPoints || 0) >= reward.points ? 'Redeem' : `Need ${reward.points - (user?.greenPoints || 0)} more points`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ways to Earn Points */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Star className="text-blue-600" size={20} />
          <span>Ways to Earn Green Points</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Leaf className="text-green-600" size={16} />
            </div>
            <div>
              <span className="font-medium">Add new plant: </span>
              <span className="text-green-600 font-semibold">+10 pts</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="text-blue-600" size={16} />
            </div>
            <div>
              <span className="font-medium">Refer a friend: </span>
              <span className="text-green-600 font-semibold">+25 pts</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Trophy className="text-purple-600" size={16} />
            </div>
            <div>
              <span className="font-medium">Share garden design: </span>
              <span className="text-green-600 font-semibold">+15 pts</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Award className="text-yellow-600" size={16} />
            </div>
            <div>
              <span className="font-medium">Complete monthly care: </span>
              <span className="text-green-600 font-semibold">+5 pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;