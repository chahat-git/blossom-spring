import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Users, Zap } from 'lucide-react';
import AnimatedLogo from '../components/common/AnimatedLogo';

const HomePage: React.FC = () => {
  const wallPots = [
    {
      id: 1,
      name: 'Modern Ceramic Wall Planter',
      price: '$29.99',
      image: 'https://i.pinimg.com/564x/9b/aa/46/9baa46e03426f2e54425e096c34f1853.jpg',
      description: 'Elegant ceramic design perfect for small plants'
    },
    {
      id: 2,
      name: 'Hanging Garden Basket',
      price: '$39.99',
      image: 'https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/best-plants-for-hanging-baskets-2022-hero.jpg',
      description: 'Woven basket for trailing plants'
    },
    {
      id: 3,
      name: 'Vertical Plant Tower',
      price: '$89.99',
      image: 'https://growbags.in/wp-content/uploads/2024/02/Vertical-Hydroponic-Aeroponic-Tower-Planting-System.jpeg',
      description: 'Multi-tier planter for maximum greenery'
    },
    {
      id: 4,
      name: 'Minimalist Wall Mount',
      price: '$19.99',
      image: 'https://m.media-amazon.com/images/I/6186UUFjIoL._UF350,350_QL50_.jpg',
      description: 'Clean lines for modern spaces'
    }
  ];

  const features = [
    {
      icon: <Leaf className="text-green-500" size={24} />,
      title: 'Smart Plant Care',
      description: 'AI-powered recommendations for optimal plant health'
    },
    {
      icon: <Shield className="text-blue-500" size={24} />,
      title: 'Expert Support',
      description: '24/7 access to professional gardening advice'
    },
    {
      icon: <Users className="text-purple-500" size={24} />,
      title: 'Community',
      description: 'Connect with fellow urban gardeners'
    },
    {
      icon: <Zap className="text-yellow-500" size={24} />,
      title: 'Quick Solutions',
      description: 'Emergency plant rescue services available'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center leafy-pattern">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <AnimatedLogo size={120} />
          </div>
          
          <h2 className="text-7xl font-bold gradient-text mb-4 slide-in-up">
            Blossom☘Spring
          </h2>
          
          <p className="text-2xl text-gray-600 mb-8 slide-in-up" style={{ animationDelay: '0.2s' }}>
            Smart Care for Your Urban Garden
          </p>
          
          <div className="max-w-2xl mx-auto mb-12 slide-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Transform your urban space into a thriving green sanctuary with our intelligent plant care solutions.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              From personalized care schedules to expert consultations, we provide everything you need 
              to nurture your plants and create beautiful living spaces.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Join thousands of urban gardeners who trust Blossom Spring for healthier plants and greener homes.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center slide-in-up" style={{ animationDelay: '0.6s' }}>
            <Link
              to="/signup"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center hover-lift"
            >
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/features"
              className="bg-white hover:bg-gray-50 text-green-600 px-8 py-3 rounded-lg font-semibold border-2 border-green-600 transition-colors hover-lift"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Why Choose Blossom Spring?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall Pots Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
            Premium Wall Planters
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Transform your walls into living art with our curated collection
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wallPots.map((pot) => (
              <div
                key={pot.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover-lift"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={pot.image}
                    alt={pot.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{pot.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{pot.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">{pot.price}</span>
                    <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/membership"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center hover-lift"
            >
              View All Products
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of urban gardeners creating beautiful, healthy plant environments
          </p>
          <Link
            to="/signup"
            className="bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center hover-lift"
          >
            Start Your Garden Journey
            <ArrowRight className="ml-2" size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;