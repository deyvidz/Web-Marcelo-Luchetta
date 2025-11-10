import { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Provider que envuelve la aplicación
export function CartProvider({ children }) {
    // Estado del carrito (array de productos)
    const [cart, setCart] = useState([]);

    // Cargar carrito del localStorage al iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem('dentalproCart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Guardar carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('dentalproCart', JSON.stringify(cart));
    }, [cart]);

    // Agregar producto al carrito
    const addToCart = (product) => {
        setCart(prevCart => {
            // Verificar si el producto ya está en el carrito
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
                // Si existe en mi carrito, aumentar cantidad, el map recorre todos los items, si encuentra el que coincide '?', le suma 1 a la cantidad, si no ':', lo deja igual
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si no existe, agregarlo con cantidad 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Eliminar producto del carrito
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Actualizar cantidad de un producto
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // Vaciar carrito
    const clearCart = () => {
        setCart([]);
    };

    // Calcular total de items
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Calcular precio total
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Valor que se comparte con todos los componentes
    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
