import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validar formulario
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    }
    
    return newErrors;
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Aquí simulamos el envío
    console.log('Formulario enviado:', formData);
    
    // Aca haría fetch() en el backend
    // Por ahora, simulamos éxito
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Contáctanos
        </h1>
        <p className="text-gray-600 text-center mb-8">
          ¿Tienes alguna consulta? Completa el formulario y te responderemos a la brevedad
        </p>

        {/* Mensaje de éxito */}
        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 text-2xl px-3 py-4 rounded mb-6">
            ✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          {/* Nombre */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Nombre *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg placeholder:text-gray-700/70 focus:outline-none focus:ring-2 ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-300' 
                  : 'border-gray-300 focus:ring-blue-300'
              }`}
              placeholder="Tu nombre completo"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg placeholder:text-gray-700/70 focus:outline-none focus:ring-2 ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-300' 
                  : 'border-gray-300 focus:ring-blue-300'
              }`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Teléfono (opcional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="+54 11 1234-5678"
            />
          </div>

          {/* Mensaje */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Mensaje *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-2 border rounded-lg placeholder:text-gray-700/70 focus:outline-none focus:ring-2 ${
                errors.message 
                  ? 'border-red-500 focus:ring-red-300' 
                  : 'border-gray-300 focus:ring-blue-300'
              }`}
              placeholder="Cuéntanos en qué podemos ayudarte..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Enviar Mensaje
          </button>
        </form>

        {/* Información de contacto */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Otras formas de contacto
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>📧 Email: marceloluchetta@hotmail.com</p>
            <p>📱 WhatsApp: +54 11 5249-8558</p>
            <p>🕐 Instagram: @marcelo_luchetta</p>
          </div>
        </div>
      </div>
    </div>
  );
}