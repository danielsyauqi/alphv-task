import { Link, usePage, router } from '@inertiajs/react';
import { LayoutGrid, Plus, LogOut, GalleryHorizontal, User, ChevronDown, User2Icon, UserCheck2Icon, UserCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
    const { url, auth } = usePage().props;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    const handleLogout = () => {
        router.post(route('logout'));
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo and Brand */}
                        <div className="flex-shrink-0 flex items-center">
                            <img 
                                src="../logo-half.jpeg" 
                                alt="Logo" 
                                className="h-8 w-auto mr-2"
                            />
                            <span className="font-bold text-xl">Shape Management</span>
                        </div>
                        
                        {/* Navigation Links */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href={route('gallery')}
                                className={`${
                                    url === '/gallery'
                                        ? 'border-indigo-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                <GalleryHorizontal className="w-4 h-4 mr-2" />
                                Shapes Gallery
                            </Link>

                            {auth.user.is_admin && (
                                <>
                                    <Link
                                        href={route('shapes.index')}
                                        className={`${
                                            url === '/shapes'
                                                ? 'border-indigo-500 text-gray-900'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        <LayoutGrid className="w-4 h-4 mr-2" />
                                        Shapes Management
                                    </Link>

                                    <Link
                                        href={route('shapes.create')}
                                        className={`${
                                            url === '/shapes/create'
                                                ? 'border-indigo-500 text-gray-900'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add New Shape
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* User Menu Dropdown */}
                    <div className="flex items-center" ref={dropdownRef}>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 focus:outline-none transition"
                            >
                                <span className="mr-2">{auth.user.name}</span>
                                {auth.user.is_admin && (
                                    <span className="mr-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                                        Admin
                                    </span>
                                )}
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <Link
                                            href={route('profile.edit')}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <User className="w-4 h-4 inline mr-2" />
                                            Edit Profile
                                        </Link>
                                        
                                        {auth.user.is_admin && (
                                            <Link
                                                href={route('users.index')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <UserCircle className="w-4 h-4 inline mr-2" />
                                                Manage Users
                                            </Link>
                                        )}
                                        
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <LogOut className="w-4 h-4 inline mr-2" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}