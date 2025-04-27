import Header from "../components/header";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome Home</h2>
          <p className="text-gray-700 text-center mb-4">
            This is the home page of our application.
          </p>
          <button
            type="button"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
