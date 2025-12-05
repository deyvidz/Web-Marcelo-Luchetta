/**
 * Formatea un número como precio en pesos argentinos
 * @param {number} price - El precio a formatear
 * @returns {string} El precio formateado (ej: "$450.000")
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined) return '$0';
  
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};
