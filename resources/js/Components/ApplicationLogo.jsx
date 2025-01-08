export default function ApplicationLogo({ className }) {
    return (
        <div className="flex flex-col items-center gap-3">
            <img 
                src="/logo.webp"
                alt="ALPHV Shapes Management"
                className={`${className}`} // Adjust size as needed
                style={{ width: '300px', height: '100px' }}
            />
            <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-gray-900">ALPHV Shapes Management</span>
                <span className="text-sm text-gray-600">"Shaping Order, Perfecting Design"</span>
            </div>        
        </div>
    );
}