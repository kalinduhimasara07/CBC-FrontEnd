export default function FloatingNotice({ message = "Before placing an order, please login first." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[6px]">
      <div className="bg-white/60 border border-white/30 rounded-2xl px-6 py-4 shadow-lg text-center max-w-md w-full mx-4">
        <div className="text-amber-600 text-lg font-semibold mb-2">Notice</div>
        <p className="text-gray-800 font-medium">{message}</p>
      </div>
    </div>
  );
}
