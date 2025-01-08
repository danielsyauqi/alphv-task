import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import ShapeLayout from '@/Layouts/ShapeLayout';
import { Triangle, Circle, Square } from '@/Components/Shapes';
import { Eye, Edit, Trash2 } from 'lucide-react';
import Modal from '@/Components/Modal';



export default function Index() {
    const { shapes } = usePage().props;
    const [showingModal, setShowingModal] = useState(false);
    const [selectedShape, setSelectedShape] = useState(null);
    const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'delete'

    const handleShow = (shape) => {
        setSelectedShape(shape);
        setModalMode('view');
        setShowingModal(true);
    };

    const handleEdit = (shape) => {
        router.visit(route('shapes.edit', shape.id));
    };

    const handleDelete = (shape) => {
        setSelectedShape(shape);
        setModalMode('delete');
        setShowingModal(true);
    };

    const confirmDelete = () => {
        router.delete(route('shapes.destroy', selectedShape.id), {
            onSuccess: () => setShowingModal(false),
        });
    };

    const renderShape = (shape) => {
        switch (shape.shape) {
            case 'triangle':
                return <Triangle color={shape.color} />;
            case 'square':
                return <Square color={shape.color} />;
            default:
                return <Circle color={shape.color} />;
        }
    };

    return (
        <ShapeLayout title="Shape Management">

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Timestamp
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Shape
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {shapes.map((shape) => (
                            <tr key={shape.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(shape.created_at).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {shape.name.charAt(0).toUpperCase() + shape.name.slice(1)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {renderShape(shape)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => handleShow(shape)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(shape)}
                                            className="text-yellow-600 hover:text-yellow-900"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(shape)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* View/Delete Modal */}
            <Modal show={showingModal} onClose={() => setShowingModal(false)}>
                <div className="p-6">
                    {modalMode === 'view' && selectedShape && (
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">
                                Shape Details
                            </h2>
                            <div className="mt-4">
                                <p><strong>Name:</strong> {selectedShape.name.charAt(0).toUpperCase() + selectedShape.name.slice(1)}</p>
                                <p><strong>Shape Type:</strong> {selectedShape.shape.charAt(0).toUpperCase() + selectedShape.shape.slice(1)}</p>
                                <p><strong>Color:</strong> {selectedShape.color}</p>
                                <div className="mt-2">
                                    <strong>Preview:</strong>
                                    <div className="mt-2">
                                        {renderShape(selectedShape)}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                    onClick={() => setShowingModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    {modalMode === 'delete' && selectedShape && (
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">
                                Delete Shape
                            </h2>
                            <p className="mt-4 text-sm text-gray-600">
                                Are you sure you want to delete the shape "{selectedShape.name}"? This action cannot be undone.
                            </p>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                    onClick={() => setShowingModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </ShapeLayout>
    );
}