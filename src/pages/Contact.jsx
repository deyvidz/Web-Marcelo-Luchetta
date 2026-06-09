import { useForm, Controller } from "react-hook-form"
import { useToast } from '../context/ToastContext.jsx';
import { saveContactMessage } from "../services/contactService";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import WhatsappCta from '../components/features/WhatsappCta.jsx';
export default function Contact() {
  const { showToast } = useToast();
  const { control, register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();


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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-text text-center">Contáctanos</h1>
        <div className="w-24 h-1 mb-1 bg-linear-to-r from-primary to-secondary mx-auto rounded-full"></div>
        <p className="text-gray text-center mb-8">
          ¿Estas buscando un producto en especifico? Completa el formulario y te responderemos a la brevedad
        </p>

        <form className="bg-backgroundb shadow-xl rounded-2xl p-8 md:p-10 border border-gray/20" onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
          <div className="mb-6">
            <label className="block text-text font-bold mb-3 text-lg">
              Nombre *
            </label>
            <input
              {...register('name', { required: 'El nombre es obligatorio' })}
              type="text"
              placeholder="Nombre"
              className={`w-full px-5 py-3 border-2 rounded-xl placeholder:text-gray/50 focus:outline-none focus:ring-4 transition-all duration-200 ${errors.name
                ? 'border-red-500 focus:ring-red-200 bg-red-50'
                : 'border-gray focus:ring-primary/20 focus:border-primary'
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
            <label className="block text-text font-bold mb-3 text-lg">
              Teléfono *
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'El número de teléfono es obligatorio',
                pattern: {
                  value: /^[+]?[\d\s-()]{6,}$/,
                  message: 'Ingresá un número de teléfono válido',
                },
              }}
              render={({ field }) => (
                <div className={`flex border-2 rounded-xl overflow-hidden transition-all duration-200 ${errors.phone
                  ? 'border-red-500 focus-within:ring-4 focus-within:ring-red-200 bg-red-50'
                  : 'border-gray focus-within:ring-4 focus-within:ring-primary/20 focus-within:border-primary'
                  }`}>
                  <PhoneInput
                    {...field}
                    defaultCountry="AR"
                    placeholder="11 12345678"
                    numberInputProps={{
                      'aria-label': 'Número de teléfono',
                      className: 'flex-1 px-5 py-3 placeholder:text-gray/50 focus:outline-none bg-transparent',
                    }}
                  />
                </div>
              )}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1">
                <span>⚠️</span> {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-text font-bold mb-3 text-lg">
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
              className={`w-full px-5 py-3 border-2 rounded-xl placeholder:text-gray/50 focus:outline-none focus:ring-4 transition-all duration-200 ${errors.email
                ? 'border-red-500 focus:ring-red-200 bg-red-50'
                : 'border-gray focus:ring-primary/20 focus:border-primary'
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
            <label className="block text-text font-bold mb-3 text-lg">
              Mensaje *
            </label>
            <textarea
              {...register('message', { required: 'El mensaje es obligatorio', minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres' } })}
              rows="6"
              className={`w-full px-5 py-3 border-2 rounded-xl placeholder:text-gray/50 focus:outline-none focus:ring-4 transition-all duration-200 resize-none ${errors.message
                ? 'border-red-500 focus:ring-red-200 bg-red-50'
                : 'border-gray focus:ring-primary/20 focus:border-primary'
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
            className={`w-full bg-linear-to-r from-primary to-secondary hover:brightness-90 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none `}
            disabled={isSubmitting}
            tabIndex={0}
            aria-label="Enviar mensaje de contacto"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>

        {/* CTA: WhatsApp directo */}
        <WhatsappCta title="¿Preferís escribirnos por WhatsApp?">
          Tocá el botón y te respondemos a la brevedad con atención personalizada.
        </WhatsappCta>
      </div>
    </div>
  );
}
