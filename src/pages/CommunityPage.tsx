import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Camera, Filter, Search, TrendingUp } from 'lucide-react';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    membershipTier: 'bronze' | 'silver' | 'gold';
  };
  content: string;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
  liked?: boolean;
}

const CommunityPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const mockPosts: Post[] = [
    {
      id: '1',
      user: {
        name: 'Emma Green',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
        membershipTier: 'gold'
      },
      content: 'My monstera is finally showing new growth after following the care tips from GreenBot! The new leaves are massive. Thanks to everyone in the community for the advice! 🌿✨',
      images: ['https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400'],
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: '2 hours ago',
      tags: ['monstera', 'growth', 'success-story']
    },
    {
      id: '2',
      user: {
        name: 'Marcus Plant',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        membershipTier: 'silver'
      },
      content: 'Check out my urban jungle transformation! Started with just 3 plants last year, now I have over 30. My balcony has never looked better! What do you think of the arrangement?',
      images: [
        'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/4790314/pexels-photo-4790314.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      likes: 42,
      comments: 15,
      shares: 7,
      timestamp: '5 hours ago',
      tags: ['urban-jungle', 'balcony', 'transformation']
    },
    {
      id: '3',
      user: {
        name: 'Sarah Leaf',
        avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
        membershipTier: 'bronze'
      },
      content: 'Need help! My snake plant leaves are turning yellow. I water it once a week and it gets indirect light. Any suggestions from experienced plant parents?',
      images: [],
      likes: 12,
      comments: 23,
      shares: 2,
      timestamp: '1 day ago',
      tags: ['help', 'snake-plant', 'yellow-leaves']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Posts', count: 247 },
    { id: 'success-stories', label: 'Success Stories', count: 89 },
    { id: 'help', label: 'Help & Advice', count: 56 },
    { id: 'transformations', label: 'Transformations', count: 34 },
    { id: 'designs', label: 'Garden Designs', count: 68 }
  ];

  const trendingTopics = [
    { tag: '#MonsteraMania', posts: 145 },
    { tag: '#UrbanJungle', posts: 98 },
    { tag: '#PlantParentTips', posts: 76 },
    { tag: '#BalconyGoals', posts: 67 },
    { tag: '#PlantRescue', posts: 54 }
  ];

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Community Garden Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect, share, and learn with fellow urban gardeners from around the world
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="text-gray-600" size={20} />
                <h3 className="font-semibold text-gray-900">Categories</h3>
              </div>
              <div className="space-y-2">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeFilter === filter.id
                        ? 'bg-green-100 text-green-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{filter.label}</span>
                      <span className="text-sm text-gray-500">{filter.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="text-green-600" size={20} />
                <h3 className="font-semibold text-gray-900">Trending</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-green-600 font-medium">{topic.tag}</span>
                    <span className="text-sm text-gray-500">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">YU</span>
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your garden journey..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                      <Camera size={20} />
                      <span>Add Photo</span>
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {mockPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Post Header */}
                  <div className="p-4 pb-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{post.user.name}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getTierBadgeColor(post.user.membershipTier)}`}>
                            {post.user.membershipTier}
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm">{post.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map(tag => (
                        <span key={tag} className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Post Images */}
                  {post.images.length > 0 && (
                    <div className={`grid gap-2 px-4 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      {post.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Post image"
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="p-4 pt-3">
                    <div className="flex items-center justify-between text-gray-600">
                      <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                        <Heart size={20} className={post.liked ? 'text-red-500 fill-current' : ''} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                        <MessageCircle size={20} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                        <Share2 size={20} />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-semibold text-gray-900">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-semibold text-green-600">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plants Shared</span>
                  <span className="font-semibold text-gray-900">8,923</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Stories</span>
                  <span className="font-semibold text-blue-600">2,156</span>
                </div>
              </div>
            </div>

            {/* Featured Community */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🌟 Plant of the Month</h3>
              <img
                src="https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Featured plant"
                className="w-full aspect-square object-cover rounded-lg mb-3"
              />
              <h4 className="font-medium text-gray-900 mb-1">Snake Plant (Sansevieria)</h4>
              <p className="text-sm text-gray-600 mb-3">
                Perfect for beginners! Low maintenance and air purifying qualities make it ideal for urban environments.
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm transition-colors">
                Learn Care Tips
              </button>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-3">
                  <div className="font-medium text-gray-900">Virtual Plant Swap</div>
                  <div className="text-sm text-gray-600">Jan 25, 2025 • 2:00 PM</div>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <div className="font-medium text-gray-900">Winter Care Workshop</div>
                  <div className="text-sm text-gray-600">Feb 1, 2025 • 7:00 PM</div>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <div className="font-medium text-gray-900">Community Challenge</div>
                  <div className="text-sm text-gray-600">Feb 14, 2025 • All Day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;