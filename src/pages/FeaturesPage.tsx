import React from 'react';
import { 
  Smartphone, 
  Brain, 
  Calendar, 
  BarChart3, 
  Users, 
  Shield,
  Zap,
  Heart,
  Leaf,
  MessageCircle,
  Camera,
  Trophy
} from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <Smartphone className="text-green-600" size={32} />,
      title: 'Smart Plant Monitoring',
      description: 'Track plant health with AI-powered insights, automated watering reminders, and growth progress analytics.',
      benefits: ['Real-time health tracking', 'Smart watering schedules', 'Growth analytics', 'Disease detection']
    },
    {
      icon: <Brain className="text-purple-600" size={32} />,
      title: 'AI Garden Assistant',
      description: 'Get personalized care recommendations from our intelligent GreenBot that learns your garden\'s unique needs.',
      benefits: ['24/7 plant care support', 'Personalized recommendations', 'Problem diagnosis', 'Expert knowledge base']
    },
    {
      icon: <Calendar className="text-blue-600" size={32} />,
      title: 'Service Scheduling',
      description: 'Book professional maintenance visits, track service history, and manage your garden care calendar.',
      benefits: ['Professional maintenance', 'Flexible scheduling', 'Service history tracking', 'Emergency support']
    },
    {
      icon: <BarChart3 className="text-teal-600" size={32} />,
      title: 'Eco Impact Tracking',
      description: 'Monitor your environmental contribution with detailed analytics on CO₂ offset, oxygen production, and water conservation.',
      benefits: ['CO₂ offset tracking', 'Oxygen production metrics', 'Water conservation data', 'Environmental achievements']
    },
    {
      icon: <Users className="text-orange-600" size={32} />,
      title: 'Community Hub',
      description: 'Connect with fellow gardeners, share designs, get advice, and participate in seasonal challenges.',
      benefits: ['Expert community', 'Design sharing', 'Seasonal challenges', 'Knowledge exchange']
    },
    {
      icon: <Trophy className="text-yellow-600" size={32} />,
      title: 'Rewards System',
      description: 'Earn Green Points for plant care activities and redeem them for rewards, discounts, and exclusive perks.',
      benefits: ['Green Points rewards', 'Exclusive discounts', 'Achievement badges', 'Referral bonuses']
    }
  ];

  const additionalFeatures = [
    {
      icon: <Camera className="text-pink-500" size={24} />,
      title: 'Plant Photo Journal',
      description: 'Document growth with photos and time-lapse creation'
    },
    {
      icon: <MessageCircle className="text-blue-500" size={24} />,
      title: 'Expert Chat Support',
      description: 'Direct access to certified plant care specialists'
    },
    {
      icon: <Shield className="text-green-500" size={24} />,
      title: 'Plant Health Insurance',
      description: 'Protection coverage for your valuable plants'
    },
    {
      icon: <Zap className="text-yellow-500" size={24} />,
      title: 'Emergency Rescue',
      description: 'Quick response for critical plant care situations'
    },
    {
      icon: <Heart className="text-red-500" size={24} />,
      title: 'Plant Adoption',
      description: 'Find new homes for plants you can no longer care for'
    },
    {
      icon: <Leaf className="text-green-500" size={24} />,
      title: 'Seasonal Care Guides',
      description: 'Customized care instructions for every season'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-pink-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Powerful Features for Your Garden
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover all the tools and services that make Blossom Spring the complete solution 
            for urban gardening success. From AI-powered insights to community connections, 
            we've got everything you need to grow.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Plus Many More Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                </div>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
            Choose Your Plan
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Bronze</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Silver</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Gold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['Plant Health Tracking', true, true, true],
                  ['Basic Care Reminders', true, true, true],
                  ['AI Assistant (GreenBot)', false, true, true],
                  ['Service Scheduling', false, true, true],
                  ['Eco Impact Analytics', false, true, true],
                  ['Community Access', false, false, true],
                  ['Priority Support', false, false, true],
                  ['Emergency Rescue Service', false, false, true]
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-900">{row[0]}</td>
                    <td className="py-4 px-6 text-center">
                      {row[1] ? <span className="text-green-600">✓</span> : <span className="text-gray-400">–</span>}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row[2] ? <span className="text-green-600">✓</span> : <span className="text-gray-400">–</span>}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row[3] ? <span className="text-green-600">✓</span> : <span className="text-gray-400">–</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <a
              href="/membership"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center hover-lift"
            >
              View Detailed Pricing
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Garden?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of urban gardeners who've already started their journey with Blossom Spring
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="bg-white hover:bg-gray-100 text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors hover-lift"
            >
              Start Free Trial
            </a>
            <a
              href="/contact"
              className="border-2 border-white hover:bg-white hover:text-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors hover-lift"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;