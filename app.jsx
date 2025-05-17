import React, { useState, useEffect } from 'react';
import { Sun, Moon, Zap, Image, BarChart2, Terminal, Layers, FileText, Database, Code, Play, Settings, Eye } from 'lucide-react';

const VisionLockDashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [modelStats, setModelStats] = useState({
    accuracy: 87.4,
    loss: 0.32,
    precision: 91.2,
    recall: 85.6,
    f1: 88.3,
    inferenceTime: 124, // ms
    epochs: 25,
    batchSize: 32,
    learningRate: 0.001,
  });
  
  const [datasetStats, setDatasetStats] = useState({
    trainSize: 1200,
    testSize: 300,
    unlabeledSize: 150,
    classes: ['cat', 'dog', 'bird', 'fish', 'reptile'],
    distribution: [320, 280, 250, 210, 140],
  });

  // Sample data for confusion matrix
  const confusionMatrix = [
    [118, 6, 2, 0, 4],
    [8, 102, 6, 3, 1],
    [1, 7, 112, 0, 0],
    [0, 2, 3, 95, 10],
    [4, 0, 1, 7, 88]
  ];

  // Sample prediction results
  const predictions = [
    { id: 1, image: '/api/placeholder/80/80', actual: 'cat', predicted: 'cat', confidence: 0.94 },
    { id: 2, image: '/api/placeholder/80/80', actual: 'dog', predicted: 'dog', confidence: 0.88 },
    { id: 3, image: '/api/placeholder/80/80', actual: 'bird', predicted: 'bird', confidence: 0.92 },
    { id: 4, image: '/api/placeholder/80/80', actual: 'fish', predicted: 'reptile', confidence: 0.67 },
    { id: 5, image: '/api/placeholder/80/80', actual: 'reptile', predicted: 'reptile', confidence: 0.85 },
    { id: 6, image: '/api/placeholder/80/80', actual: 'cat', predicted: 'dog', confidence: 0.59 },
  ];

  // Sample log entries
  const logEntries = [
    { timestamp: '2025-05-17 14:32:45', level: 'INFO', message: 'Dataset preparation complete' },
    { timestamp: '2025-05-17 14:33:12', level: 'INFO', message: 'Model training started - MobileNetV2 backbone' },
    { timestamp: '2025-05-17 14:45:23', level: 'INFO', message: 'Epoch 25/25 completed - accuracy: 87.4%' },
    { timestamp: '2025-05-17 14:45:24', level: 'INFO', message: 'Model saved to /visionlock/models/model_20250517_1445.h5' },
    { timestamp: '2025-05-17 14:47:01', level: 'WARNING', message: 'Low confidence predictions detected in batch' },
    { timestamp: '2025-05-17 14:47:53', level: 'INFO', message: 'Generated dashboard at /visionlock/html/index.html' },
  ];

  // Toggle the dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    // Apply dark mode to body when component mounts and when darkMode changes
    document.body.className = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  }, [darkMode]);

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="bg-gray-800 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Project Status</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Model Type</div>
              <div className="text-lg font-semibold text-gray-100">MobileNetV2</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Training Status</div>
              <div className="text-lg font-semibold text-green-400">Completed</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Accuracy</div>
              <div className="text-lg font-semibold text-gray-100">{modelStats.accuracy}%</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Inference Time</div>
              <div className="text-lg font-semibold text-gray-100">{modelStats.inferenceTime} ms</div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mt-6 mb-4 text-gray-100">Recent Activity</h3>
          <div className="space-y-2">
            {logEntries.slice(0, 4).map((entry, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded-md text-sm">
                <span className="text-gray-400">{entry.timestamp}</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  entry.level === 'WARNING' ? 'bg-yellow-700 text-yellow-200' : 
                  entry.level === 'ERROR' ? 'bg-red-700 text-red-200' : 
                  'bg-blue-700 text-blue-200'
                }`}>
                  {entry.level}
                </span>
                <div className="mt-1 text-gray-300">{entry.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Dataset Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Training samples</span>
              <span className="text-gray-100 font-semibold">{datasetStats.trainSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Test samples</span>
              <span className="text-gray-100 font-semibold">{datasetStats.testSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Unlabeled samples</span>
              <span className="text-gray-100 font-semibold">{datasetStats.unlabeledSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Classes</span>
              <span className="text-gray-100 font-semibold">{datasetStats.classes.length}</span>
            </div>
          </div>
          
          <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-100">Class Distribution</h4>
          <div className="space-y-2">
            {datasetStats.classes.map((className, index) => (
              <div key={index} className="w-full">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">{className}</span>
                  <span className="text-sm text-gray-100">{datasetStats.distribution[index]}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(datasetStats.distribution[index] / Math.max(...datasetStats.distribution)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md flex items-center justify-center">
              <Play size={18} className="mr-2" />
              Run Inference
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md flex items-center justify-center">
              <Layers size={18} className="mr-2" />
              Train Model
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-md flex items-center justify-center">
              <Database size={18} className="mr-2" />
              Dataset
            </button>
            <button className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-md flex items-center justify-center">
              <FileText size={18} className="mr-2" />
              Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataset = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-100">Dataset Management</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-lg font-semibold text-gray-100 mb-2">Training</h4>
          <div className="text-3xl font-bold text-blue-400 mb-2">{datasetStats.trainSize}</div>
          <div className="text-sm text-gray-400">samples</div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-lg font-semibold text-gray-100 mb-2">Testing</h4>
          <div className="text-3xl font-bold text-green-400 mb-2">{datasetStats.testSize}</div>
          <div className="text-sm text-gray-400">samples</div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-lg font-semibold text-gray-100 mb-2">Unlabeled</h4>
          <div className="text-3xl font-bold text-amber-400 mb-2">{datasetStats.unlabeledSize}</div>
          <div className="text-sm text-gray-400">samples</div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-100 mb-3">Sample Images</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="bg-gray-700 rounded-md overflow-hidden">
              <img src={`/api/placeholder/100/100`} alt="Sample" className="w-full h-auto" />
              <div className="p-2 text-center text-xs text-gray-300">
                {datasetStats.classes[i % datasetStats.classes.length]}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-100 mb-3">Dataset Operations</h4>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center">
                <Database size={16} className="mr-2" />
                Prepare Dataset
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm flex items-center">
                <Image size={16} className="mr-2" />
                Import Images
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm flex items-center">
                <Settings size={16} className="mr-2" />
                Preprocessing
              </button>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm flex items-center">
                <Eye size={16} className="mr-2" />
                View All
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gray-100 mb-3">Preprocessing Settings</h4>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Image Size</label>
                <select className="w-full bg-gray-600 text-gray-100 px-3 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500">
                  <option>224 x 224</option>
                  <option>256 x 256</option>
                  <option>299 x 299</option>
                  <option>384 x 384</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Augmentation Level</label>
                <select className="w-full bg-gray-600 text-gray-100 px-3 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500">
                  <option>None</option>
                  <option>Light</option>
                  <option>Medium</option>
                  <option>Heavy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Train/Test Split</label>
                <select className="w-full bg-gray-600 text-gray-100 px-3 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500">
                  <option>80/20</option>
                  <option>75/25</option>
                  <option>70/30</option>
                  <option>60/40</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModel = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Model Performance</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Accuracy</div>
              <div className="text-2xl font-bold text-gray-100">{modelStats.accuracy}%</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Loss</div>
              <div className="text-2xl font-bold text-gray-100">{modelStats.loss}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Precision</div>
              <div className="text-2xl font-bold text-gray-100">{modelStats.precision}%</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Recall</div>
              <div className="text-2xl font-bold text-gray-100">{modelStats.recall}%</div>
            </div>
          </div>
          
          <h4 className="text-lg font-semibold text-gray-100 mb-3">Confusion Matrix</h4>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="p-2 text-gray-100 border border-gray-600"></th>
                  {datasetStats.classes.map((className, index) => (
                    <th key={index} className="p-2 text-gray-100 border border-gray-600">
                      Pred: {className}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {datasetStats.classes.map((className, rowIndex) => (
                  <tr key={rowIndex}>
                    <th className="p-2 text-gray-100 border border-gray-600">Act: {className}</th>
                    {confusionMatrix[rowIndex].map((value, colIndex) => (
                      <td 
                        key={colIndex} 
                        className={`p-2 text-center border border-gray-600 ${
                          rowIndex === colIndex ? 'bg-green-900 text-green-100' : 'text-gray-300'
                        }`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Sample Predictions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {predictions.map((pred) => (
              <div key={pred.id} className="bg-gray-700 rounded-lg overflow-hidden">
                <div className="p-3 flex items-center space-x-3">
                  <img src={pred.image} alt={`Sample ${pred.id}`} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <div className="text-gray-100 font-semibold">
                      {pred.predicted === pred.actual ? (
                        <span className="text-green-400">✓ {pred.predicted}</span>
                      ) : (
                        <span className="text-red-400">✗ {pred.predicted}</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">Actual: {pred.actual}</div>
                    <div className="text-sm">
                      <span className="text-gray-400">Confidence: </span>
                      <span className={`${
                        pred.confidence > 0.8 ? 'text-green-400' : 
                        pred.confidence > 0.6 ? 'text-yellow-400' : 
                        'text-red-400'
                      }`}>
                        {(pred.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Model Configuration</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Architecture</span>
              <span className="text-gray-100">MobileNetV2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Epochs</span>
              <span className="text-gray-100">{modelStats.epochs}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Batch Size</span>
              <span className="text-gray-100">{modelStats.batchSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Learning Rate</span>
              <span className="text-gray-100">{modelStats.learningRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Optimizer</span>
              <span className="text-gray-100">Adam</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Loss Function</span>
              <span className="text-gray-100">Categorical Crossentropy</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Training Controls</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Model Type</label>
              <select className="w-full bg-gray-700 text-gray-100 px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500">
                <option>Custom CNN</option>
                <option selected>MobileNetV2</option>
                <option>ResNet50</option>
                <option>EfficientNetB0</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Epochs</label>
              <input 
                type="number" 
                value={modelStats.epochs}
                className="w-full bg-gray-700 text-gray-100 px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Learning Rate</label>
              <input 
                type="number" 
                step="0.0001"
                value={modelStats.learningRate}
                className="w-full bg-gray-700 text-gray-100 px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold">
              Start Training
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Save/Load Model</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md flex items-center justify-center">
              <Code size={16} className="mr-2" />
              Export Model (TFLite)
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex items-center justify-center">
              <FileText size={16} className="mr-2" />
              Save Checkpoint
            </button>
            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md flex items-center justify-center">
              <Layers size={16} className="mr-2" />
              Load Pretrained
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInference = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Image Prediction</h3>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-6 border-2 border-dashed border-gray-600 flex flex-col items-center justify-center">
            <Image size={48} className="text-gray-400 mb-3" />
            <p className="text-gray-300 mb-2">Drop image here or click to upload</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
              Select Image
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-3">Prediction Results</h4>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-1">Top Prediction</div>
                  <div className="text-2xl font-bold text-blue-400">Cat</div>
                  <div className="text-sm text-gray-300">Confidence: 94.2%</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-400 mb-1">Other Possibilities</div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Dog</span>
                    <span className="text-gray-300">4.5%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '4.5%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Bird</span>
                    <span className="text-gray-300">0.8%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '0.8%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Fish</span>
                    <span className="text-gray-300">0.3%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '0.3%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Reptile</span>
                    <span className="text-gray-300">0.2%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '0.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-3">Feature Visualization</h4>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-center mb-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">
                    Grad-CAM
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-md text-sm ml-2">
                    Activations
                  </button>
                </div>
                
                <div className="text-center">
                  <img src="/api/placeholder/300/200" alt="Grad-CAM Visualization" className="rounded-lg mx-auto" />
                  <p className="text-sm text-gray-400 mt-2">Grad-CAM visualization showing model attention regions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Batch Inference</h3>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm flex items-center">
                <Image size={16} className="mr-2" />
                Select Folder
              </button>
              
              <div className="text-gray-300 text-sm">
                No folder selected
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-100 mb-3">Batch Settings</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Confidence Threshold</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value="70"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Output Format</label>
                <select className="w-full bg-gray-600 text-gray-100 px-3 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500">
                  <option>JSON Results</option>
                  <option>CSV Export</option>
                  <option>Organized Folders</option>
                  <option>All Formats</option>
                </select>
              </div>
            </div>
            
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold">
              Run Batch Inference
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Inference Stats</h3>
          
          <div className="space-y-4">
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Avg Inference Time</div>
              <div className="text-xl font-bold text-gray-100">{modelStats.inferenceTime} ms</div>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Memory Usage</div>
              <div className="text-xl font-bold text-gray-100">248 MB</div>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Processed Images</div>
              <div className="text-xl font-bold text-gray-100">143</div>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm text-gray-400">Success Rate</div>
              <div className="text-xl font-bold text-green-400">98.6%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Recent Inference Logs</h3>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {logEntries.map((entry, index) => (
              <div key={index} className="bg-gray-700 p-2 rounded-md text-xs">
                <span className="text-gray-400">{entry.timestamp}</span>
                <span className={`ml-2 px-1 py-0.5 rounded text-xs ${
                  entry.level === 'WARNING' ? 'bg-yellow-700 text-yellow-200' : 
                  entry.level === 'ERROR' ? 'bg-red-700 text-red-200' : 
                  'bg-blue-700 text-blue-200'
                }`}>
                  {entry.level}
                </span>
                <div className="mt-1 text-gray-300">{entry.message}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Optimization</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Model Optimization</label>
              <select className="w-full bg-gray-700 text-gray-100 px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500">
                <option>None (Standard Model)</option>
                <option>Quantization (INT8)</option>
                <option>Pruning (50%)</option>
                <option>Full Optimization</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Batch Processing</label>
              <select className="w-full bg-gray-700 text-gray-100 px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500">
                <option>Single Image</option>
                <option>Batch (4 images)</option>
                <option>Batch (8 images)</option>
                <option>Batch (16 images)</option>
              </select>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-2">
              Apply Optimization
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-100">System Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-3">Environment</h4>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Device</span>
                    <span className="text-gray-100">Samsung Galaxy Z-Fold 6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Processor</span>
                    <span className="text-gray-100">Snapdragon Gen 3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">OS</span>
                    <span className="text-gray-100">Ubuntu (proot-distro)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Python</span>
                    <span className="text-gray-100">3.10.12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">TensorFlow</span>
                    <span className="text-gray-100">2.15.0</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-3">Paths & Storage</h4>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Project Root</span>
                    <span className="text-gray-100 truncate">/data/visionlock/</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dataset</span>
                    <span className="text-gray-100 truncate">/data/visionlock/dataset/</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Models</span>
                    <span className="text-gray-100 truncate">/data/visionlock/models/</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Output</span>
                    <span className="text-gray-100 truncate">/data/visionlock/output/</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Free Space</span>
                    <span className="text-gray-100">64.2 GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Configuration</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-3">Dashboard Settings</h4>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Dark Mode</span>
                    <button 
                      onClick={toggleDarkMode}
                      className={`w-12 h-6 flex items-center rounded-full p-1 ${darkMode ? 'bg-blue-600 justify-end' : 'bg-gray-600 justify-start'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white"></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Auto-refresh</span>
                    <button className="w-12 h-6 flex items-center rounded-full p-1 bg-blue-600 justify-end">
                      <div className="w-4 h-4 rounded-full bg-white"></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Notifications</span>
                    <button className="w-12 h-6 flex items-center rounded-full p-1 bg-blue-600 justify-end">
                      <div className="w-4 h-4 rounded-full bg-white"></div>
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Refresh Interval</label>
                    <select className="w-full bg-gray-600 text-gray-100 px-3 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500">
                      <option>5 seconds</option>
                      <option>10 seconds</option>
                      <option>30 seconds</option>
                      <option>1 minute</option>
                      <option>5 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-3">Advanced Settings</h4>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Logging Level</label>
                    <select className="w-full bg-gray-600 text-gray-100 px-3 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500">
                      <option>DEBUG</option>
                      <option selected>INFO</option>
                      <option>WARNING</option>
                      <option>ERROR</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">CPU Threads</label>
                    <select className="w-full bg-gray-600 text-gray-100 px-3 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500">
                      <option>1 (Low Power)</option>
                      <option>2</option>
                      <option selected>4 (Balanced)</option>
                      <option>8 (Performance)</option>
                      <option>Max Available</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Memory Limit</label>
                    <select className="w-full bg-gray-600 text-gray-100 px-3 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500">
                      <option>1 GB</option>
                      <option>2 GB</option>
                      <option selected>4 GB</option>
                      <option>6 GB</option>
                      <option>8 GB</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-100">Project Info</h3>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <div className="text-center mb-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white text-2xl font-bold">
                <Eye size={32} />
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-100">VISIONLOCK</h4>
              <p className="text-sm text-gray-400">Bratva Blueprint v2.0</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-600">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Version</span>
                <span className="text-gray-100">2.0.1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-gray-100">May 17, 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-100 mb-3">Quick Actions</h4>
            
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md flex items-center justify-center">
                <Terminal size={16} className="mr-2" />
                Launch Terminal
              </button>
              
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex items-center justify-center">
                <FileText size={16} className="mr-2" />
                Export Project Report
              </button>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md flex items-center justify-center">
                <Code size={16} className="mr-2" />
                View Source Code
              </button>
              
              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md flex items-center justify-center">
                <Settings size={16} className="mr-2" />
                Reset Configuration
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-100">About</h3>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300 mb-4">
              VISIONLOCK is a lean, modular image classification system designed to run 100% offline on mobile devices. 
              Built with a focus on lightweight implementation and visual interfaces.
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Framework</span>
                <span className="text-gray-100">TensorFlow / TFLite</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Interface</span>
                <span className="text-gray-100">CLI + Static HTML</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Language</span>
                <span className="text-gray-100">Python 3.10+</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">License</span>
                <span className="text-gray-100">MIT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Eye size={32} className={`mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                VISIONLOCK
                <span className={`ml-2 text-xs px-2 py-1 rounded ${darkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                  BRATVA v2.0
                </span>
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Mobile-First ML Image Recognition & Categorization
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-gray-200 text-blue-600'}`}
              aria-label="Notifications"
            >
              <Zap size={20} />
            </button>
            
            <button 
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>
      
      <nav className={`py-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="container mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2 font-medium rounded-md transition ${
                activeTab === 'overview' 
                  ? darkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white' 
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            
            <button 
              onClick={() => setActiveTab('dataset')}
              className={`px-6 py-2 font-medium rounded-md transition ${
                activeTab === 'dataset' 
                  ? darkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white' 
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Dataset
            </button>
            
            <button 
              onClick={() => setActiveTab('model')}
              className={`px-6 py-2 font-medium rounded-md transition ${
                activeTab === 'model' 
                  ? darkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white' 
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Model
            </button>
            
            <button 
              onClick={() => setActiveTab('inference')}
              className={`px-6 py-2 font-medium rounded-md transition ${
                activeTab === 'inference' 
                  ? darkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white' 
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Inference
            </button>
            
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-2 font-medium rounded-md transition ${
                activeTab === 'settings' 
                  ? darkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white' 
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto py-6 px-4">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'dataset' && renderDataset()}
        {activeTab === 'model' && renderModel()}
        {activeTab === 'inference' && renderInference()}
        {activeTab === 'settings' && renderSettings()}
      </main>
      
      <footer className={`py-4 px-6 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'} shadow-inner mt-6`}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0 text-sm">
            VISIONLOCK © 2025 | Bratva Blueprint v2.0
          </div>
          <div className="text-sm">
            Memory: 248MB | CPU: 24% | Storage: 64.2GB free
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VisionLockDashboard;
