// Bloque <h3> + lista de filtros. Reutilizado en el sidebar de desktop
// y dentro del acordeón mobile. `className` permite controlar el margin-top
// entre secciones (mt-6 mobile, mt-8 desktop).
export default function FilterSection({ title, children, className = '' }) {
    return (
        <div className={className}>
            <h3 className="text-2xl font-bold text-text pb-4 mb-6 border-b border-gray-300">
                {title}
            </h3>
            {children}
        </div>
    );
}
