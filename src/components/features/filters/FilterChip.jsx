// Chip removible de un filtro activo. Muestra el valor y un botón × para quitarlo.
export default function FilterChip({ label, onRemove, ariaLabel }) {
    return (
        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
            {label}
            <button
                type="button"
                onClick={onRemove}
                className="hover:text-primary/80"
                aria-label={ariaLabel ?? `Quitar filtro ${label}`}
            >
                ×
            </button>
        </span>
    );
}
