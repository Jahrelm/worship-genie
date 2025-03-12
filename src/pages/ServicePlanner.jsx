
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Trash2, Book, Music, Image, Video, Save, Play, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import VerseLookup from '../components/VerseLookup';

const ServicePlanner = () => {
  const [items, setItems] = useState([]);
  const [serviceName, setServiceName] = useState('Sunday Morning Service');
  const [serviceDate, setServiceDate] = useState(new Date().toISOString().slice(0, 10));
  
  const addItem = (type) => {
    const newItem = {
      id: Date.now().toString(),
      type,
      content: type === 'scripture' ? { reference: 'John 3:16', text: 'For God so loved the world...' } :
              type === 'song' ? { title: 'Amazing Grace', artist: 'Traditional' } :
              type === 'media' ? { title: 'Welcome Slide', type: 'image' } :
              { title: 'New Item' }
    };
    
    setItems([...items, newItem]);
  };
  
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    
    setItems(reorderedItems);
  };
  
  const handleSaveService = () => {
    // Would save to database, but for now just save to localStorage
    const service = {
      id: Date.now().toString(),
      name: serviceName,
      date: serviceDate,
      items: items,
      created: new Date().toISOString()
    };
    
    // Get existing services or initialize empty array
    const existingServices = JSON.parse(localStorage.getItem('services') || '[]');
    localStorage.setItem('services', JSON.stringify([...existingServices, service]));
    
    alert('Service saved!');
  };
  
  return (
    <div className="container mx-auto px-6 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Service Planner</h1>
        <p className="text-muted-foreground mb-8">Create and organize your church service</p>
        
        <div className="glass-card p-6 rounded-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Service Name</label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Service Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  className="w-full pl-10 px-4 py-2 border border-border rounded-md"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSaveService}
              className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Service
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => addItem('scripture')}
            className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            <Book className="w-4 h-4 mr-2" />
            Add Scripture
          </button>
          <button
            onClick={() => addItem('song')}
            className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
          >
            <Music className="w-4 h-4 mr-2" />
            Add Song
          </button>
          <button
            onClick={() => addItem('media')}
            className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
          >
            <Image className="w-4 h-4 mr-2" />
            Add Media
          </button>
        </div>
        
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted px-6 py-3 text-lg font-medium">
            Service Items
          </div>
          
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="service-items">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[300px] p-4"
                >
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                      <Plus className="w-12 h-12 mb-4 text-amber-300" />
                      <p>Add items to your service using the buttons above</p>
                    </div>
                  ) : (
                    items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 mb-4 rounded-md border border-border shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {item.type === 'scripture' && <Book className="w-5 h-5 mr-3 text-blue-500" />}
                                {item.type === 'song' && <Music className="w-5 h-5 mr-3 text-green-500" />}
                                {item.type === 'media' && <Image className="w-5 h-5 mr-3 text-purple-500" />}
                                
                                <div>
                                  {item.type === 'scripture' && (
                                    <>
                                      <div className="font-medium">{item.content.reference}</div>
                                      <div className="text-sm text-muted-foreground truncate max-w-md">
                                        {item.content.text}
                                      </div>
                                    </>
                                  )}
                                  
                                  {item.type === 'song' && (
                                    <>
                                      <div className="font-medium">{item.content.title}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {item.content.artist}
                                      </div>
                                    </>
                                  )}
                                  
                                  {item.type === 'media' && (
                                    <>
                                      <div className="font-medium">{item.content.title}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {item.content.type}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button
                                  className="p-2 text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                                  title="Preview"
                                >
                                  <Play className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ServicePlanner;
