import { ModalProps } from "@/types";

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="20"
    height="20"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width="24"
    height="24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const PricingModal: React.FC<ModalProps> = ({ tier, onClose, onConfirm }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto flex flex-col max-h-[90vh] transform animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-2xl font-semibold text-gray-800">
            {tier.icon} {tier.name} Plan
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <p className="font-semibold text-gray-700 mb-4">Course Details</p>
          <ul className="space-y-3">
            {tier.courceDetails.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-teal-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0">
          <button
            onClick={onConfirm}
            className="w-full py-3 px-4 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          >
            Confirm on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
