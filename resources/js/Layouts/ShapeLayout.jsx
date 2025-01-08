import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function ShapeLayout({ title, children }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <main className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}