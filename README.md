# PaginaMarcelo — (Catálogo y Carrito)

Una SPA en React que funciona como catálogo comercial para Marcelo Luchetta: presenta productos odontológicos, permite filtrarlos por categoría, añadirlos a un carrito y finalizar pedidos vía WhatsApp. Ideal como demo, prototipo comercial o base para una pequeña tienda online.

## Descripción breve
Interfaz limpia y responsive para explorar productos, gestionar un carrito y generar un pedido listo para enviar por WhatsApp. Útil para mostrar catálogo, recibir consultas y facilitar pedidos directos sin pasarela de pago.

## Principales características / módulos
- Páginas: Home, Productos, Contacto, Quién soy, Carrito.
- Gestión de carrito global con Context API y hook personalizado (useCart).
- Listado y filtrado por categorías; tarjetas de producto reutilizables.
- Checkout por WhatsApp: genera mensaje con detalle del pedido y total.
- Formulario de contacto con validación básica.
- Componentes UI: NavBar, Footer, ProductList, ProductCard, CartModal, FeatureSection.

## Tecnologías empleadas
- React (JSX) + Hooks
- react-router-dom (enrutamiento)
- Context API para estado global (carrito)
- Vite (entorno de desarrollo, inferido)
- Tailwind CSS (estilos por utilidades, inferido)
- JavaScript, CSS

## Estado actual / propósito
Proyecto funcional como MVP/demo: navegación, catálogo, carrito y generación de pedido por WhatsApp ya implementados. Está preparado para extenderse (persistencia, backend, checkout formal, autenticación, tests). El código está organizado para facilitar ampliaciones y personalizaciones.