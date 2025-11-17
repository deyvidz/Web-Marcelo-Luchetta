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
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 text-green-800 text-lg px-6 py-4 rounded-xl mb-6 shadow-lg flex items-center gap-3 animate-slide-left">
            <span className="text-2xl">✅</span>
            <span className="font-semibold">¡Mensaje enviado con éxito! Te contactaremos pronto.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-gray-100">
          {/* Nombre */}
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-3 text-lg">
              Nombre *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-5 py-3 border-2 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-200 bg-red-50' 
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
              placeholder="Tu nombre completo"
              aria-label="Nombre completo"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1">
                <span>⚠️</span> {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-3 text-lg">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-5 py-3 border-2 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-200 bg-red-50' 
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
              placeholder="tu@email.com"
              aria-label="Correo electrónico"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1">
                <span>⚠️</span> {errors.email}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-3 text-lg">
              Teléfono <span className="text-gray-500 font-normal text-sm">(opcional)</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
              placeholder="+54 11 1234-5678"
              aria-label="Número de teléfono"
            />
          </div>

          {/* Mensaje */}
          <div className="mb-8">
            <label className="block text-gray-800 font-bold mb-3 text-lg">
              Mensaje *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className={`w-full px-5 py-3 border-2 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 resize-none ${
                errors.message 
                  ? 'border-red-500 focus:ring-red-200 bg-red-50' 
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
              placeholder="Cuéntanos en qué podemos ayudarte..."
              aria-label="Mensaje"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1">
                <span>⚠️</span> {errors.message}
              </p>
            )}
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
            tabIndex={0}
            aria-label="Enviar mensaje de contacto"
          >
            Enviar Mensaje
          </button>
        </form>

        {/* Información de contacto */}
        <div className="mt-10 bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-2xl p-8 border border-blue-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Otras formas de contacto
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📧</div>
              <p className="text-gray-600 font-medium mb-2">Email</p>
              <a 
                href="mailto:marceloluchetta@hotmail.com" 
                className="text-blue-600 hover:text-blue-700 font-semibold break-all"
                tabIndex={0}
                aria-label="Enviar email a marceloluchetta@hotmail.com"
              >
                marceloluchetta@hotmail.com
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📱</div>
              <p className="text-gray-600 font-medium mb-2">WhatsApp</p>
              <a 
                href="https://wa.me/5491152498558" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-semibold"
                tabIndex={0}
                aria-label="Contactar por WhatsApp"
              >
                +54 11 5249-8558
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📸</div>
              <p className="text-gray-600 font-medium mb-2">Instagram</p>
              <a 
                href="https://instagram.com/marcelo_luchetta" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 font-semibold"
                tabIndex={0}
                aria-label="Seguir en Instagram"
              >
                @marcelo_luchetta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}