import React, { createContext, useContext, useState, useEffect } from 'react';

interface Plant {
  id: string;
  name: string;
  type: string;
  health: 'excellent' | 'good' | 'fair' | 'poor';
  lastWatered: string;
  nextWatering: string;
  location: string;
}

interface Service {
  id: string;
  type: string;
  date: string;
  status: 'completed' | 'scheduled' | 'cancelled';
  notes: string;
}

interface UserData {
  plants: Plant[];
  services: Service[];
  ecoImpact: {
    co2Offset: number;
    oxygenProduced: number;
    waterSaved: number;
  };
  designs: any[];
}

interface UserContextType {
  userData: UserData;
  updatePlant: (plantId: string, updates: Partial<Plant>) => void;
  addPlant: (plant: Omit<Plant, 'id'>) => void;
  removePlant: (plantId: string) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  saveDesign: (design: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    plants: [
      {
        id: '1',
        name: 'Rubber Plant',
        type: 'Ficus',
        health: 'excellent',
        lastWatered: '2025-01-15',
        nextWatering: '2025-01-18',
        location: 'Living Room'
      },
      {
        id: '2',
        name: 'Snake Plant',
        type: 'Sansevieria',
        health: 'good',
        lastWatered: '2025-01-10',
        nextWatering: '2025-01-24',
        location: 'Bedroom'
      }
    ],
    services: [
      {
        id: '1',
        type: 'Monthly Maintenance',
        date: '2025-01-20',
        status: 'scheduled',
        notes: 'General plant care and health check'
      }
    ],
    ecoImpact: {
      co2Offset: 12.5,
      oxygenProduced: 8.2,
      waterSaved: 45.0
    },
    designs: []
  });

  const updatePlant = (plantId: string, updates: Partial<Plant>) => {
    setUserData(prev => ({
      ...prev,
      plants: prev.plants.map(plant => 
        plant.id === plantId ? { ...plant, ...updates } : plant
      )
    }));
  };

  const addPlant = (plant: Omit<Plant, 'id'>) => {
    const newPlant: Plant = {
      ...plant,
      id: Math.random().toString(36)
    };
    setUserData(prev => ({
      ...prev,
      plants: [...prev.plants, newPlant]
    }));
  };

  const removePlant = (plantId: string) => {
    setUserData(prev => ({
      ...prev,
      plants: prev.plants.filter(plant => plant.id !== plantId)
    }));
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      id: Math.random().toString(36)
    };
    setUserData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const saveDesign = (design: any) => {
    setUserData(prev => ({
      ...prev,
      designs: [...prev.designs, { ...design, id: Math.random().toString(36) }]
    }));
  };

  return (
    <UserContext.Provider value={{
      userData,
      updatePlant,
      addPlant,
      removePlant,
      addService,
      saveDesign
    }}>
      {children}
    </UserContext.Provider>
  );
};