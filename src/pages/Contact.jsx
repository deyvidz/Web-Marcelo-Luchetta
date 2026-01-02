import { useForm } from "react-hook-form"
import { useToast } from '../context/ToastContext.jsx';
import { Icons } from "../icons/IconLibrary.jsx";
import { saveContactMessage } from "../services/contactService";
export default function Contact() {
  const { showToast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();


  const onSubmit = async (data) => {
    try {
      await saveContactMessage(data);
      showToast('¡Mensaje enviado con éxito!', 'success');
      reset();
    } catch (error) {
      showToast('Error al enviar el mensaje. Por favor, intenta nuevamente.', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Contáctanos</h1>
        <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        <p className=" text-gray-600 text-center mb-8">
          ¿Estas buscando un producto en especifico? Completa el formulario y te responderemos a la brevedad
        </p>

        <form className="bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-gray-100" onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-3 text-lg">
              Nombre *
            </label>
            <input
              {...register('name', { required: 'El nombre es obligatorio' })}
              type="text"
              placeholder="Nombre"
              className={`w-full px-5 py-3 border-2 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 ${errors.name
                ? 'border-red-500 focus:ring-red-200 bg-red-50'
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
              aria-label="Nombre"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1">
                <span>⚠️</span> {errors.name.message}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-3 text-lg">
              Teléfono *
            </label>
            <input
              {...register('phone', {
                required: 'El número de teléfono es obligatorio',
                pattern: {
                  value: /^\d{2,4} \d{3,4}\d{3,4}$/,
                  message: 'El formato del número de teléfono es inválido',
                },
              })}
              type="tel"
              className={`w-full px-5 py-3 border-2 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 ${errors.phone
                ? 'border-red-500 focus:ring-red-200 bg-red-50'
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
              placeholder="11 12345678"
              aria-label="Número de teléfono"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1">
                <span>⚠️</span> {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-3 text-lg">
              Email <span className="text-gray-500 font-normal text-sm">(opcional)</span>
            </label>
            <input
              {...register('email', {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'El formato del email es inválido',
                },
              })}
              type="email"
              className={`w-full px-5 py-3 border-2 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 ${errors.email
                ? 'border-red-500 focus:ring-red-200 bg-red-50'
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
              placeholder="tu@email.com"
              aria-label="Correo electrónico"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1">
                <span>⚠️</span> {errors.email.message}
              </p>
            )}
          </div>



          {/* Mensaje */}
          <div className="mb-8">
            <label className="block text-gray-800 font-bold mb-3 text-lg">
              Mensaje *
            </label>
            <textarea
              {...register('message', { required: 'El mensaje es obligatorio', minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres' } })}
              rows="6"
              className={`w-full px-5 py-3 border-2 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 resize-none ${errors.message
                ? 'border-red-500 focus:ring-red-200 bg-red-50'
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
              placeholder="Contanos en qué podemos ayudarte..."
              aria-label="Mensaje"
            />
            {errors.message && (
              <p id="message-error" className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1">
                <span>⚠️</span> {errors.message.message}
              </p>
            )}
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            className={`w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none `}
            disabled={isSubmitting}
            tabIndex={0}
            aria-label="Enviar mensaje de contacto"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>

        {/* Información de contacto */}
        <div className="mt-10 bg-linear-to-br from-blue-50 to-white shadow-xl rounded-2xl p-8 border border-blue-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Otras formas de contacto
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center text-center bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <Icons.Facebook className=' w-7 h-7' />
              <p className="text-gray-600 font-medium mb-2">Facebook</p>
              <a
                href="https://www.facebook.com/marceloluchetta"
                target="_blank"
                className="text-blue-600 hover:text-blue-700 font-semibold break-all"
                tabIndex={0}
                aria-label="Enviar email a marceloluchetta@hotmail.com"
              >
                Marcelo Oscar Luchetta
              </a>
            </div>
            <div className="flex flex-col items-center text-center bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <Icons.Whatsapp className=' w-7 h-7' />
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
            <div className="flex flex-col items-center text-center bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <Icons.Instagram className=' w-7 h-7' />
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
