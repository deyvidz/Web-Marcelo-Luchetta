import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-gradient-to-r from-green-500 to-green-600',
    error: 'bg-gradient-to-r from-red-500 to-red-600',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
  };

  const icon = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  };

  return (
    <div
      className={`fixed top-20 right-4 md:right-8 z-50 ${bgColor[type]} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in-right min-w-[280px] max-w-md`}
      role="alert"
      aria-live="polite"
    >
      <span className="text-2xl font-bold">{icon[type]}</span>
      <p className="flex-1 font-semibold">{message}</p>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 text-xl font-bold transition-colors"
        aria-label="Cerrar notificación"
        tabIndex={0}
      >
        ✕
      </button>
    </div>
  );
}

