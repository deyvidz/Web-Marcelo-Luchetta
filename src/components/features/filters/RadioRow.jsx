// Radio button con estilo custom para que el círculo se pinte siempre,
// incluso en mobile donde accent-color a veces no aplica bien al radio nativo.
// Interceptamos el click: si ya estaba activo, prevenimos el default y avisamos
// al padre (que borra la URL param).
export default function RadioRow({ name, value, current, onChange, children }) {
    const isActive = current === value;

    return (
        <label className="flex items-center cursor-pointer group">
            <input
                type="radio"
                name={name}
                value={value}
                checked={isActive}
                onChange={() => onChange(value)}
                onClick={(e) => {
                    if (isActive) {
                        e.preventDefault();
                        onChange(value);
                    }
                }}
                className="peer sr-only"
            />
            <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isActive ? 'border-primary' : 'border-gray-300 group-hover:border-primary/60'
                }`}
            >
                {isActive && <span className="w-2 h-2 rounded-full bg-primary" />}
            </span>
            <span className={`ml-3 text-sm font-semibold transition-all ${
                isActive ? 'text-text' : 'text-gray-700 group-hover:text-text/80'
            }`}>
                {children}
            </span>
        </label>
    );
}
