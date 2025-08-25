import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, User, Building } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after showing success message
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'general',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="text-green-600" size={24} />,
      title: 'Email Us',
      content: 'hello@blossomspring.com',
      description: 'Send us an email anytime!'
    },
    {
      icon: <Phone className="text-blue-600" size={24} />,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: <MapPin className="text-purple-600" size={24} />,
      title: 'Visit Us',
      content: '123 Garden Street, Green City, NY 10001',
      description: 'Come visit our urban garden showcase'
    },
    {
      icon: <Clock className="text-orange-600" size={24} />,
      title: 'Business Hours',
      content: 'Mon - Fri: 8:00 AM - 5:00 PM',
      description: 'Weekend emergency support available'
    }
  ];

  const faqItems = [
    {
      question: 'How quickly do you respond to inquiries?',
      answer: 'We typically respond to all inquiries within 24 hours during business days.'
    },
    {
      question: 'Do you offer emergency plant care services?',
      answer: 'Yes! Our Gold members get priority emergency support, and we offer emergency services for all customers.'
    },
    {
      question: 'Can I schedule a consultation before signing up?',
      answer: 'Absolutely! We offer free 15-minute consultations to help you choose the right plan.'
    },
    {
      question: 'Do you provide services outside the city?',
      answer: 'Currently, our in-person services are available within the metro area. However, our app and remote support are available nationwide.'
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-pink-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent! 🌱</h2>
          <p className="text-gray-600 mb-4">
            Thank you for reaching out! We'll get back to you within 24 hours.
          </p>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-700">
              In the meantime, feel free to explore our features or chat with GreenBot for immediate plant care tips!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-pink-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about plant care, need help with your garden, or want to learn more about our services? 
            We're here to help you grow! 🌿
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
              <p className="text-gray-600">We'll respond as soon as possible</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="membership">Membership Questions</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="emergency">Emergency Plant Care</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gray-100 p-3 rounded-lg">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-800 font-medium">{info.content}</p>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Need immediate help?</h3>
              <p className="text-green-700 mb-4">
                Try our AI assistant GreenBot for instant answers to common plant care questions!
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Chat with GreenBot
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqItems.map((faq, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/features"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View more FAQs →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;