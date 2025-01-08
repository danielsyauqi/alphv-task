import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import ShapeLayout from '@/Layouts/ShapeLayout';

export default function Edit({ shape }) {
    const { data, setData, put, processing, errors } = useForm({
        name: shape.name,
        shape: shape.shape,
        color: shape.color,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('shapes.update', shape.id));
    };

    return (
        <ShapeLayout>
            <Head title="Edit Shape" />

            <div className="max-w-2xl mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Edit Shape
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.name && <div className="text-red-500 text-xs italic">{errors.name}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Shape
                                </label>
                                <select
                                    value={data.shape}
                                    onChange={e => setData('shape', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="circle">Circle</option>
                                    <option value="square">Square</option>
                                    <option value="triangle">Triangle</option>
                                </select>
                                {errors.shape && <div className="text-red-500 text-xs italic">{errors.shape}</div>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Color
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="color"
                                        value={data.color}
                                        onChange={e => setData('color', e.target.value)}
                                        className="h-14 w-24 cursor-pointer border rounded p-1"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <div 
                                            className="w-16 h-16 rounded border"
                                            style={{ backgroundColor: data.color }}
                                        />
                                        <input
                                            type="text"
                                            value={data.color}
                                            onChange={e => setData('color', e.target.value)}
                                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 w-28"
                                        />
                                    </div>
                                </div>
                                {errors.color && <div className="text-red-500 text-xs italic mt-2">{errors.color}</div>}
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                <a
                                    href={route('shapes.index')}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                                >
                                    Update Shape
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ShapeLayout>
    );
}