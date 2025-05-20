export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 w-full">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-lg text-gray-600">Page Not Found</p>
            <p className="mt-2 text-gray-500">The page you are looking for does not exist.</p>
            <a href="/" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Go to Home
            </a>
        </div>
        </div>
    );
}