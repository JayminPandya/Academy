import { ModalProps, IPricing } from "@/types";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const PricingModal: React.FC<ModalProps> = ({ tier, onClose, onConfirm }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
      onClick={onClose}
    >
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes scaleIn { from { transform: scale(0.95); } to { transform: scale(1); } }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
          .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
        `}
      </style>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto flex flex-col max-h-[90vh] transform animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-[#b89658]">{tier.icon}</span>
            {tier.name} Plan
          </h3>
        </div>

        <div className="p-8 overflow-y-auto">
          <p className="font-semibold text-gray-800 mb-4 text-lg">
            Course Details & Features
          </p>
          <ul className="space-y-3">
            {tier.courceDetails.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckIcon className="h-6 w-6 text-[#b89658] mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex flex-col sm:flex-row gap-4">
          <button
            onClick={onConfirm}
            className="w-full py-3 px-4 rounded-lg bg-[#b89658] text-white font-bold hover:bg-[#a9884f] transition-all duration-300 transform hover:scale-105"
          >
            Confirm on WhatsApp
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-6 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
