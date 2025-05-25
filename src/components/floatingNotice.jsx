import { User,} from "lucide-react";

export default function FloatingNotice({
  message = "Before placing an order, please login first.",
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[10px]">
      <div className="bg-white/90 border border-white/30 rounded-2xl px-6 py-4 shadow-lg text-center max-w-md w-full mx-4">
        {/* Icon */}
        <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-amber-600" />
        </div>

        {/* Title */}
        <div className="text-amber-600 text-xl font-bold mb-3">
          Login Required
        </div>

        {/* Message */}
        <p className="text-gray-700 font-medium mb-6 leading-relaxed">
          Please login or create an account to complete your purchase.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-[#e17100] hover:bg-[#c5610a] text-white py-3 px-6 rounded-lg font-semibold transition-colors">
            Login to Account
          </button>

          <button className="w-full bg-white/80 hover:bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors">
            Create New Account
          </button>

          <button className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm font-medium transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
