import React, { useState, useRef, useCallback } from 'react';
import { useUser } from '../contexts/UserContext';
import { Save, Trash2, RotateCcw, Grid, Plus } from 'lucide-react';

interface DesignItem {
  id: string;
  type: 'plant' | 'pot' | 'furniture' | 'sample';
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
    { id: 'plant1', name: 'Dieffenbachia plant', image: 'https://m.media-amazon.com/images/I/81BjLUaT-DL._AC_UF1000,1000_QL80_.jpg', size: { width: 80, height: 80 } },
    { id: 'plant2', name: 'Snake Plant', image: 'https://planaplant.com/cdn/shop/products/fiber2_494x544.jpg?v=1671022787', size: { width: 110, height: 160 } },
    { id: 'plant3', name: 'Strelitzia nicolai', image: 'https://www.vogueandvine.com.au/wp-content/uploads/2024/03/Garden-Designer-Manly-Sydney-scaled.jpg', size: { width: 100, height: 120 } },
    { id: 'plant4', name: 'Cordyline Plant', image: 'https://unlimitedgreens.com/cdn/shop/products/Dracaena-Kedarnath.webp?v=1764934185&width=768', size: { width: 75, height: 90 } }
  ];

  const potLibrary = [
    { id: 'pot1', name: 'Buddha Statue', image: 'https://www.wallofgardens.com/wp-content/uploads/2024/10/8-2.png', size: { width: 140, height: 150 } },
    { id: 'pot2', name: 'Hanging Basket', image: 'https://i.etsystatic.com/26436589/r/il/0140cb/7636006613/il_fullxfull.7636006613_jzjc.jpg', size: { width: 100, height: 110 } },
    { id: 'pot3', name: 'Plant Stand', image: 'https://rukminim2.flixcart.com/image/480/640/knw2v0w0/plant-container-set/3/g/7/1-multi-tier-plant-stand-flower-pot-stand-for-balcony-living-original-imag2gbzgzhvzqzf.jpeg?q=90', size: { width: 140, height: 170 } },
    {id: 'pot4', name: 'Lamps', image: 'https://m.media-amazon.com/images/I/61amOEB3DEL._AC_UF1000,1000_QL80_.jpg', size: { width: 95, height: 85 } }
  ];

  const furnitureLibrary = [
    { id: 'table1', name: 'Outdoor Chair', image: 'https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2024/03/14151327/garden-design-for-balcony-terracotta.jpg', size: { width: 120, height: 140 } },
    { id: 'chair1', name: 'Garden Table', image: 'https://i0.wp.com/archwhispers.com/wp-content/uploads/2025/11/Dreamy-Apartment-Balcony-Garden-Ideas-Filled-With-Plants-Lights-Colorful-Seating-and-Creative-Garden-Ideas-Glowing-in-Warm-Sunlight.png?resize=800%2C425&ssl=1', size: { width: 100, height: 100} },
    { id: 'shelf1', name: 'Garden Mirror', image: 'https://www.rockettstgeorge.co.uk/cdn/shop/products/rockettstgeorge-antique-gold-small-ornate-mirror-lores-1.jpg?v=1683725388', size: { width: 100, height: 120 } },
    { id: 'shelf2', name: 'Hanging light', image: 'https://assets-news.housing.com/news/wp-content/uploads/2022/11/25144306/Hanging-lights-for-balcony-05.jpg', size: { width: 100, height: 120 } }
  ];

  const sampledesigns = [
    { id: 'table1', name: 'Design 1', image: 'https://thumbs.dreamstime.com/b/beautifully-decorated-balcony-potted-plants-greenery-hanging-lanterns-warm-light-cityscape-under-night-sky-beautifully-311231434.jpg', size: { width: 120, height: 80 } },
    { id: 'chair1', name: 'Design 2', image: 'https://st.hzcdn.com/simgs/426109a9009e19d8_14-6691/_.jpg', size: { width: 60, height: 60 } },
    { id: 'shelf1', name: 'Design 3', image: 'https://i.pinimg.com/236x/8a/f1/62/8af16236c2ebe2f129ab72be18fbb921.jpg', size: { width: 100, height: 120 } },
    { id: 'shelf2', name: 'Design 4', image: 'https://www.thatlittleshop.co.za/wp-content/uploads/2024/02/Incorporate-some-lighting-768x432.jpg', size: { width: 100, height: 120 } }
  ];

  const handleDragStart = useCallback((item: any, type: 'plant' | 'pot' | 'furniture' | 'sample') => {
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

          {/* Controls */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Canvas */}
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

            {/* Sample Design Section - Bottom Area */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Sample Designs</h3>
              <div className="grid grid-cols-2 gap-8">
                {sampledesigns.map(sample => (
                  <div
                    key={sample.id}
                    draggable
                    onDragStart={() => handleDragStart(sample, 'sample')}
                    className="bg-gray-50 rounded-lg p-4 cursor-move hover:bg-gray-100 hover:shadow-md transition-all"
                  >
                    <img 
                      src={sample.image} 
                      alt={sample.name}
                      className="w-full h-64 object-cover rounded mb-4"
                    />
                    <p className="text-base text-center text-gray-700 font-medium">{sample.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={saveCurrentDesign}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <Save size={16} />
                  <span>Save</span>
                </button>
                <button
                  onClick={clearCanvas}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Clear</span>
                </button>
              </div>
            </div>

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