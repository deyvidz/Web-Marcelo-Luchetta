// src/data/products.js
export const products = [
  {
    id: 1,
    name: 'Turbina Dental NSK',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&q=80',
    description: 'Alta velocidad, bajo ruido, tecnología japonesa de última generación',
    category: 'Equipamiento',
    featured: true 
  },
  {
    id: 2,
    name: 'Autoclave Digital',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&q=80',
    description: 'Esterilización rápida y segura con sistema digital de control',
    category: 'Equipamiento',
    featured: true
  },
  {
    id: 3,
    name: 'Lámpara LED Quirúrgica',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80',
    description: 'Iluminación profesional ajustable con tecnología LED',
    category: 'Iluminación',
    featured: true 
  },
  {
    id: 4,
    name: 'Espejo Bucal Professional',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&q=80',
    description: 'Set de 12 unidades, acero inoxidable',
    category: 'Instrumental',
    featured: false
  },
  {
    id: 5,
    name: 'Unidad Dental Completa',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=500&q=80',
    description: 'Sistema integral con sillón ergonómico de última tecnología',
    category: 'Equipamiento',
    featured: true 
  },
  {
    id: 6,
    name: 'Compresor Dental',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80',
    description: 'Silencioso, libre de aceite',
    category: 'Equipamiento',
    featured: false
  }
];

// Exportar también los productos destacados
export const featuredProducts = products.filter(p => p.featured);