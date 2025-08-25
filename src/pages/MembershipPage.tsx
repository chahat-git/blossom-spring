import React, { useState } from 'react';
import { Check, Star, Crown, Shield, Zap, ArrowRight, Users, Leaf, MessageCircle } from 'lucide-react';

const MembershipPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>('silver');

  const plans = [
    {
      id: 'bronze',
      name: 'Bronze',
      icon: <Leaf className="text-orange-600" size={32} />,
      description: 'Perfect for beginners starting their plant journey',
      monthlyPrice: 9,
      yearlyPrice: 90,
      savings: 20,
      popular: false,
      features: [
        'Basic plant care reminders',
        'Plant health tracking',
        'Mobile app access',
        'Email support',
        'Care guides & tutorials',
        'Growth photo journal',
        'Basic eco-impact tracking'
      ],
      limits: {
        plants: 5,
        designs: 3,
        support: 'Email only'
      },
      color: 'orange'
    },
    {
      id: 'silver',
      name: 'Silver',
      icon: <Star className="text-blue-600" size={32} />,
      description: 'Great for dedicated urban gardeners',
      monthlyPrice: 19,
      yearlyPrice: 190,
      savings: 20,
      popular: true,
      features: [
        'Everything in Bronze',
        'AI plant care assistant (GreenBot)',
        'Service scheduling & booking',
        'Advanced analytics',
        'Priority email support',
        'Monthly expert consultation',
        'Unlimited plant tracking',
        'Designer tool access',
        'Community forum access'
      ],
      limits: {
        plants: 25,
        designs: 10,
        support: 'Priority email + Chat'
      },
      color: 'blue'
    },
    {
      id: 'gold',
      name: 'Gold',
      icon: <Crown className="text-yellow-600" size={32} />,
      description: 'Complete solution for serious plant enthusiasts',
      monthlyPrice: 39,
      yearlyPrice: 390,
      savings: 20,
      popular: false,
      features: [
        'Everything in Silver',
        'Unlimited everything',
        '24/7 priority support',
        'Emergency plant rescue service',
        'Weekly expert consultations',
        'Custom care plans',
        'Premium community access',
        'Exclusive workshops & events',
        'Free plant delivery (monthly)',
        'Advanced designer tools',
        'API access for integrations'
      ],
      limits: {
        plants: 'Unlimited',
        designs: 'Unlimited',
        support: '24/7 Phone + Chat + Email'
      },
      color: 'yellow'
    }
  ];

  const addOns = [
    {
      name: 'Emergency Plant Rescue',
      description: '24/7 emergency support for critical plant issues',
      price: 15,
      icon: <Shield className="text-red-500" size={20} />
    },
    {
      name: 'Premium Designer Tools',
      description: 'Advanced 3D modeling and AR preview features',
      price: 12,
      icon: <Zap className="text-purple-500" size={20} />
    },
    {
      name: 'Community Premium',
      description: 'Access to exclusive forums and expert AMAs',
      price: 8,
      icon: <Users className="text-green-500" size={20} />
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      plan: 'Gold',
      text: 'Blossom Spring has transformed my urban jungle! The AI assistant is incredibly helpful, and the emergency rescue service saved my prized monstera.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Mike Chen',
      plan: 'Silver',
      text: 'The service scheduling feature is a game-changer. My plants have never been healthier, and the community is amazing!',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emma Rodriguez',
      plan: 'Bronze',
      text: 'As a beginner, the Bronze plan gave me everything I needed to get started. The care reminders are perfect!',
      rating: 4,
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      orange: {
        border: isSelected ? 'border-orange-500' : 'border-orange-200',
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        button: 'bg-orange-600 hover:bg-orange-700'
      },
      blue: {
        border: isSelected ? 'border-blue-500' : 'border-blue-200',
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      yellow: {
        border: isSelected ? 'border-yellow-500' : 'border-yellow-200',
        bg: 'bg-yellow-50',
        text: 'text-yellow-600',
        button: 'bg-yellow-600 hover:bg-yellow-700'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-pink-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Choose Your Growth Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            From beginner-friendly basics to comprehensive plant parent solutions, 
            we have the perfect plan to help your garden thrive.
          </p>

          {/* Billing Toggle */}
          <div className="bg-gray-100 p-1 rounded-lg inline-flex mb-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const colors = getColorClasses(plan.color, isSelected);
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all cursor-pointer hover:shadow-2xl ${
                  colors.border
                } ${isSelected ? 'scale-105' : 'hover:scale-102'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex p-4 rounded-2xl ${colors.bg} mb-4`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">${price}</span>
                      <span className="text-gray-600">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                      {billingCycle === 'yearly' && (
                        <div className="text-sm text-green-600 font-medium">
                          Save ${plan.monthlyPrice * 12 - plan.yearlyPrice}/year
                        </div>
                      )}
                    </div>

                    <button className={`w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors ${colors.button}`}>
                      {isSelected ? 'Selected Plan' : 'Choose Plan'}
                    </button>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="text-green-500 mt-0.5" size={16} />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limits */}
                  <div className={`${colors.bg} rounded-lg p-4`}>
                    <h4 className="font-semibold text-gray-900 mb-3">Plan Limits</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plants:</span>
                        <span className={`font-medium ${colors.text}`}>{plan.limits.plants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Designs:</span>
                        <span className={`font-medium ${colors.text}`}>{plan.limits.designs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Support:</span>
                        <span className={`font-medium ${colors.text}`}>{plan.limits.support}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Optional Add-ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  {addon.icon}
                  <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">${addon.price}/mo</span>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Detailed Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-orange-600">Bronze</th>
                  <th className="text-center py-4 px-6 font-semibold text-blue-600">Silver</th>
                  <th className="text-center py-4 px-6 font-semibold text-yellow-600">Gold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['Plant Health Tracking', true, true, true],
                  ['Mobile App Access', true, true, true],
                  ['Care Reminders', true, true, true],
                  ['AI Assistant (GreenBot)', false, true, true],
                  ['Service Scheduling', false, true, true],
                  ['Advanced Analytics', false, true, true],
                  ['Community Access', false, true, true],
                  ['24/7 Support', false, false, true],
                  ['Emergency Rescue', false, false, true],
                  ['Expert Consultations', false, 'Monthly', 'Weekly'],
                  ['Free Plant Delivery', false, false, 'Monthly']
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-900">{row[0]}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof row[1] === 'boolean' ? (
                        row[1] ? <Check className="text-green-600 mx-auto" size={20} /> : 
                        <span className="text-gray-400">–</span>
                      ) : (
                        <span className="text-orange-600 font-medium">{row[1] as string}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row[2] === 'boolean' ? (
                        row[2] ? <Check className="text-green-600 mx-auto" size={20} /> : 
                        <span className="text-gray-400">–</span>
                      ) : (
                        <span className="text-blue-600 font-medium">{row[2] as string}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row[3] === 'boolean' ? (
                        row[3] ? <Check className="text-green-600 mx-auto" size={20} /> : 
                        <span className="text-gray-400">–</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">{row[3] as string}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">
            What Our Members Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <span className="text-sm text-gray-600">{testimonial.plan} Member</span>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Growing?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of urban gardeners who've transformed their spaces with Blossom Spring
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="bg-white hover:bg-gray-100 text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight size={20} />
            </a>
            <a
              href="/contact"
              className="border-2 border-white hover:bg-white hover:text-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Talk to Sales</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;