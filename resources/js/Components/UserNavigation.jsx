import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, LogOut } from 'lucide-react';

export default function UserNavigation() {
    const { auth } = usePage().props;
    
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo and brand */}
                        <div className="flex-shrink-0 flex items-center">
                            <span className="font-bold text-xl">Shape Gallery</span>
                        </div>

                        {/* Navigation */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href={route('user-gallery')}
                                className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-indigo-500 text-gray-900"
                            >
                                <LayoutGrid className="w-4 h-4 mr-2" />
                                Gallery
                            </Link>
                        </div>
                    </div>

                    {/* User menu */}
                    <div className="flex items-center">
                        <span className="text-gray-700 mr-4">{auth.user.name}</span>
                        <button
                            onClick={() => router.post(route('logout'))}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}