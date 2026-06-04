import { formatPrice } from './formatters.js';

// Claves de URL params (query string). Centralizadas para evitar typos repetidos.
export const FILTER_KEYS = {
    categoria: 'categoria',
    marca: 'marca',
    precio: 'precio',
    nombre: 'nombre',
};

// Strings de UI para los filtros.
export const FILTER_LABELS = {
    categoria: 'Categoría',
    marca: 'Marca',
    precio: 'Precio',
    filtros: 'Filtros',
    limpiarFiltros: 'Limpiar filtros',
};

// Rangos de precio preestablecidos (en ARS).
// El `label` se genera con formatPrice para cumplir la convención del repo:
// todo dinero pasa por formatPrice (ver src/utils/formatters.js).
const buildPriceLabel = (min, max) => {
    if (max === Infinity) return `Más de ${formatPrice(min)}`;
    if (min === 0) return `Menos de ${formatPrice(max)}`;
    return `${formatPrice(min)} - ${formatPrice(max)}`;
};

const rawRanges = [
    { id: 'lt-100', min: 0, max: 100000 },
    { id: '100-300', min: 100000, max: 300000 },
    { id: '300-500', min: 300000, max: 500000 },
    { id: 'gt-500', min: 500000, max: Infinity },
];

export const PRICE_RANGES = rawRanges.map(r => ({
    ...r,
    label: buildPriceLabel(r.min, r.max),
}));

// Helper para traducir el `precio` URL param a su label legible.
export const getActivePriceLabel = (priceId) => {
    if (!priceId) return null;
    return PRICE_RANGES.find(r => r.id === priceId)?.label ?? null;
};
