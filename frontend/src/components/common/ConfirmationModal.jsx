import React, { useEffect } from "react";
import { AlertTriangle, X, Info, CheckCircle } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // danger, warning, success, info
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
          button: "bg-red-600 hover:bg-red-700 text-white",
          iconBg: "bg-red-100",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
          button: "bg-orange-600 hover:bg-orange-700 text-white",
          iconBg: "bg-orange-100",
        };
      case "success":
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          button: "bg-green-600 hover:bg-green-700 text-white",
          iconBg: "bg-green-100",
        };
      default:
        return {
          icon: <Info className="w-6 h-6 text-primary" />,
          button: "bg-primary hover:bg-primary-dark-1 text-white shadow-md",
          iconBg: "bg-primary-lightest",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-full ${styles.iconBg} mb-4`}>
              {styles.icon}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-xl font-bold text-dark mb-2">{title}</h3>
          <p className="text-neutral mb-6 leading-relaxed">{message}</p>

          <div className="flex gap-3 justify-end">
            {cancelText && (
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-dark rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 rounded-lg transition-all font-medium text-sm shadow-md ${styles.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
