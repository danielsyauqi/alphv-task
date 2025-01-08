import React, { useState } from 'react';

const ShapeModal = ({ shape, onClose }) => {
  if (!shape) return null;

return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Overlay */}
        <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={onClose}
        ></div>

        {/* Modal Container */}
        <div className="relative bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full mx-auto z-10 transform transition-all duration-300">
            {/* Shape Display */}
            <div className="flex justify-center items-center h-48 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-inner mb-6">
            {shape.component}
            </div>

            {/* Shape Information */}
            <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                {shape.name.charAt(0).toUpperCase() + shape.name.slice(1)}
            </h2>
            <p className="text-gray-600 text-lg">
                <strong>Shape:</strong> {shape.shape.charAt(0).toUpperCase() + shape.shape.slice(1)}
            </p>
            <p className="text-gray-600 text-lg">
                <strong>Color:</strong> {shape.color}
            </p>
            </div>

            {/* Close Button */}
            <div className="flex justify-center mt-8">
            <button
                className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                onClick={onClose}
            >
                Close
            </button>
            </div>
        </div>
        </div>


);
};

const ShapeGallery = ({ shapes, renderShape }) => {
  const [selectedShape, setSelectedShape] = useState(null);

  const openModal = (shape) => {
    setSelectedShape({
      ...shape,
      component: renderShape(shape)
    });
  };

  const closeModal = () => {
    setSelectedShape(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {/* Header Section */}
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Shape Gallery</h2>
              <p className="text-gray-600 mt-1">View all available shapes in the system</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800">Total Shapes</h3>
                <p className="text-3xl font-bold text-blue-600">{shapes.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800">Unique Colors</h3>
                <p className="text-3xl font-bold text-green-600">
                  {new Set(shapes.map(shape => shape.color)).size}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-800">Last Updated</h3>
                <p className="text-xl font-bold text-purple-600">
                  {shapes.length > 0
                    ? new Date(shapes[0].created_at).toLocaleDateString()
                    : 'No shapes yet'}
                </p>
              </div>
            </div>

            {/* Shapes Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {shapes.map((shape) => (
                  <div
                    key={shape.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-3000 cursor-pointer transform hover:scale-55"
                    onClick={() => openModal(shape)}
                  >
                    <div className="flex justify-center items-center h-32 bg-gray-50 rounded-lg mb-4">
                      {renderShape(shape)}
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-gray-900">{shape.name.charAt(0).toUpperCase() + shape.name.slice(1)}</h3>
                      <p className="text-sm text-gray-500 mt-1">{shape.shape.charAt(0).toUpperCase() + shape.shape.slice(1)}</p>
                      <div
                        className="w-6 h-6 rounded-full mx-auto mt-2 border border-gray-200"
                        style={{ backgroundColor: shape.color }}
                        title={shape.color}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {shapes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No shapes available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ShapeModal shape={selectedShape} onClose={closeModal} />
    </div>
  );
};

export default ShapeGallery;