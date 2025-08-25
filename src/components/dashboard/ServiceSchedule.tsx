import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Calendar, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';

const ServiceSchedule: React.FC = () => {
  const { userData, addService } = useUser();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [newService, setNewService] = useState({
    type: 'Monthly Maintenance',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const serviceTypes = [
    'Monthly Maintenance',
    'Plant Health Check',
    'Repotting Service',
    'Pest Control Treatment',
    'Emergency Care'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'scheduled': return <Clock size={16} />;
      case 'cancelled': return <AlertCircle size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  const handleBookService = (e: React.FormEvent) => {
    e.preventDefault();
    addService({
      ...newService,
      status: 'scheduled'
    });
    setNewService({
      type: 'Monthly Maintenance',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowBookingForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Schedule</h2>
          <p className="text-gray-600">Manage your plant care appointments</p>
        </div>
        <button
          onClick={() => setShowBookingForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Book Service</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Clock className="text-blue-600" size={24} />
            <div>
              <div className="text-2xl font-bold text-blue-900">
                {userData.services.filter(s => s.status === 'scheduled').length}
              </div>
              <div className="text-blue-700 text-sm">Scheduled</div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <div className="text-2xl font-bold text-green-900">
                {userData.services.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-green-700 text-sm">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Calendar className="text-purple-600" size={24} />
            <div>
              <div className="text-2xl font-bold text-purple-900">
                {userData.services.length}
              </div>
              <div className="text-purple-700 text-sm">Total Services</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Your Services</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {userData.services.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
              <p>No services scheduled yet</p>
              <button
                onClick={() => setShowBookingForm(true)}
                className="mt-2 text-green-600 hover:text-green-700 font-medium"
              >
                Book your first service
              </button>
            </div>
          ) : (
            userData.services.map((service) => (
              <div key={service.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(service.status).replace('text-', 'bg-').replace('bg-bg-', 'bg-')}`}>
                      {getStatusIcon(service.status)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{service.type}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{service.date}</span>
                        </span>
                        {service.notes && (
                          <span>• {service.notes}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Book a Service</h3>
            <form onSubmit={handleBookService} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select
                  value={newService.type}
                  onChange={(e) => setNewService({ ...newService, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {serviceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={newService.date}
                  onChange={(e) => setNewService({ ...newService, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Notes</label>
                <textarea
                  value={newService.notes}
                  onChange={(e) => setNewService({ ...newService, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder="Any specific requirements or concerns..."
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Book Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSchedule;