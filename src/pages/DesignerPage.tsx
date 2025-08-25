import React, { useState, useRef, useCallback } from 'react';
import { useUser } from '../contexts/UserContext';
import { Save, Download, Trash2, RotateCcw, Grid, Move, Plus } from 'lucide-react';

interface DesignItem {
  id: string;
  type: 'plant' | 'pot' | 'furniture' | 'decor';
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  image: string;
  rotation: number;
}

const DesignerPage: React.FC = () => {
  const { saveDesign } = useUser();
  const [designItems, setDesignItems] = useState<DesignItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [draggedItem, setDraggedItem] = useState<DesignItem | null>(null);
  const [designName, setDesignName] = useState('My Garden Design');
  const canvasRef = useRef<HTMLDivElement>(null);

  const plantLibrary = [
    { id: 'plant1', name: 'Monstera', image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=150', size: { width: 80, height: 80 } },
    { id: 'plant2', name: 'Snake Plant', image: 'https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&cs=tinysrgb&w=150', size: { width: 60, height: 100 } },
    { id: 'plant3', name: 'Fiddle Leaf', image: 'https://images.pexels.com/photos/4790314/pexels-photo-4790314.jpeg?auto=compress&cs=tinysrgb&w=150', size: { width: 70, height: 120 } },
    { id: 'plant4', name: 'Rubber Plant', image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=150', size: { width: 75, height: 90 } }
  ];

  const potLibrary = [
    { id: 'pot1', name: 'Ceramic White', image: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=150', size: { width: 50, height: 40 } },
    { id: 'pot2', name: 'Terracotta', image: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=150', size: { width: 60, height: 45 } },
    { id: 'pot3', name: 'Modern Black', image: 'https://images.pexels.com/photos/4503736/pexels-photo-4503736.jpeg?auto=compress&cs=tinysrgb&w=150', size: { width: 55, height: 50 } }
  ];

  const furnitureLibrary = [
    { id: 'table1', name: 'Garden Table', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=150', size: { width: 120, height: 80 } },
    { id: 'chair1', name: 'Outdoor Chair', image: 'https://images.pexels.com/photos/2343467/pexels-photo-2343467.jpeg?auto=compress&cs=tinysrgb&w=150', size: { width: 60, height: 60 } },
    { id: 'shelf1', name: 'Plant Shelf', image: 'https://images.pexels.com/photos/4503737/pexels-photo-4503737.jpeg?auto=compress&cs=tinysrgb&w=150', size: { width: 100, height: 120 } }
  ];

  const handleDragStart = useCallback((item: any, type: 'plant' | 'pot' | 'furniture') => {
    const newItem: DesignItem = {
      id: `${type}_${Date.now()}`,
      type,
      name: item.name,
      x: 0,
      y: 0,
      width: item.size.width,
      height: item.size.height,
      image: item.image,
      rotation: 0
    };
    setDraggedItem(newItem);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - draggedItem.width / 2;
      const y = e.clientY - rect.top - draggedItem.height / 2;
      
      const newItem = { ...draggedItem, x, y };
      setDesignItems(prev => [...prev, newItem]);
      setDraggedItem(null);
    }
  }, [draggedItem]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const moveItem = useCallback((id: string, deltaX: number, deltaY: number) => {
    setDesignItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, x: Math.max(0, item.x + deltaX), y: Math.max(0, item.y + deltaY) }
        : item
    ));
  }, []);

  const rotateItem = useCallback((id: string) => {
    setDesignItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, rotation: (item.rotation + 90) % 360 }
        : item
    ));
  }, []);

  const deleteItem = useCallback((id: string) => {
    setDesignItems(prev => prev.filter(item => item.id !== id));
    setSelectedItem(null);
  }, []);

  const clearCanvas = useCallback(() => {
    setDesignItems([]);
    setSelectedItem(null);
  }, []);

  const saveCurrentDesign = useCallback(() => {
    const design = {
      name: designName,
      items: designItems,
      timestamp: new Date().toISOString(),
      thumbnail: 'design-thumbnail.jpg' // In real app, generate thumbnail
    };
    saveDesign(design);
    alert('Design saved successfully!');
  }, [designName, designItems, saveDesign]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Virtual Balcony Designer</h1>
              <p className="text-gray-600">Create beautiful garden layouts with our drag-and-drop designer</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Design name"
              />
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded-lg transition-colors ${
                  showGrid ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Grid size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Item Library */}
          <div className="lg:col-span-1 space-y-6">
            {/* Plants */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Plants</h3>
              <div className="grid grid-cols-2 gap-3">
                {plantLibrary.map(plant => (
                  <div
                    key={plant.id}
                    draggable
                    onDragStart={() => handleDragStart(plant, 'plant')}
                    className="bg-gray-50 rounded-lg p-3 cursor-move hover:bg-gray-100 transition-colors"
                  >
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      className="w-full aspect-square object-cover rounded mb-2"
                    />
                    <p className="text-xs text-center text-gray-700">{plant.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pots */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Pots & Planters</h3>
              <div className="grid grid-cols-2 gap-3">
                {potLibrary.map(pot => (
                  <div
                    key={pot.id}
                    draggable
                    onDragStart={() => handleDragStart(pot, 'pot')}
                    className="bg-gray-50 rounded-lg p-3 cursor-move hover:bg-gray-100 transition-colors"
                  >
                    <img 
                      src={pot.image} 
                      alt={pot.name}
                      className="w-full aspect-square object-cover rounded mb-2"
                    />
                    <p className="text-xs text-center text-gray-700">{pot.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Furniture */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Furniture</h3>
              <div className="grid grid-cols-2 gap-3">
                {furnitureLibrary.map(furniture => (
                  <div
                    key={furniture.id}
                    draggable
                    onDragStart={() => handleDragStart(furniture, 'furniture')}
                    className="bg-gray-50 rounded-lg p-3 cursor-move hover:bg-gray-100 transition-colors"
                  >
                    <img 
                      src={furniture.image} 
                      alt={furniture.name}
                      className="w-full aspect-square object-cover rounded mb-2"
                    />
                    <p className="text-xs text-center text-gray-700">{furniture.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div
                ref={canvasRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className={`relative w-full h-96 border-2 border-dashed border-gray-300 rounded-lg ${
                  showGrid ? 'bg-grid-pattern' : 'bg-gray-50'
                } overflow-hidden`}
                style={{
                  backgroundImage: showGrid ? 'radial-gradient(circle, #e5e5e5 1px, transparent 1px)' : 'none',
                  backgroundSize: showGrid ? '20px 20px' : 'auto'
                }}
              >
                {designItems.map(item => (
                  <div
                    key={item.id}
                    className={`absolute cursor-move select-none ${
                      selectedItem === item.id ? 'ring-2 ring-green-500' : ''
                    }`}
                    style={{
                      left: item.x,
                      top: item.y,
                      width: item.width,
                      height: item.height,
                      transform: `rotate(${item.rotation}deg)`
                    }}
                    onClick={() => setSelectedItem(item.id)}
                    onMouseDown={(e) => {
                      const startX = e.clientX - item.x;
                      const startY = e.clientY - item.y;
                      
                      const handleMouseMove = (e: MouseEvent) => {
                        moveItem(item.id, e.clientX - startX - item.x, e.clientY - startY - item.y);
                      };
                      
                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded shadow-sm"
                      draggable={false}
                    />
                    <div className="absolute -top-6 left-0 text-xs bg-black bg-opacity-75 text-white px-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                      {item.name}
                    </div>
                  </div>
                ))}
                
                {designItems.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Plus size={48} className="mx-auto mb-2" />
                      <p>Drag items from the library to start designing</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Item Controls */}
            {selectedItem && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Item Controls</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => rotateItem(selectedItem)}
                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors"
                  >
                    <RotateCcw size={16} />
                    <span>Rotate</span>
                  </button>
                  <button
                    onClick={() => deleteItem(selectedItem)}
                    className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}

            {/* Canvas Controls */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Canvas Controls</h3>
              <div className="space-y-2">
                <button
                  onClick={saveCurrentDesign}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <Save size={16} />
                  <span>Save Design</span>
                </button>
                <button
                  onClick={clearCanvas}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Design Tips */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">💡 Design Tips</h3>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Group similar plants together</li>
                <li>• Consider sunlight patterns</li>
                <li>• Leave space for growth</li>
                <li>• Use pots of varying heights</li>
                <li>• Add furniture for functionality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerPage;