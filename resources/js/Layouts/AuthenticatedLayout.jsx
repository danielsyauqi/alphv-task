import ApplicationLogo from '@/Components/ApplicationLogo';
import { usePage,Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;


    return (

        <div>
            <div className="min-h-screen bg-gray-100">
                
                <Navbar />
                <main>{children}</main>
              
            </div>
        </div>
    );
}
