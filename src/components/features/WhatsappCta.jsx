import { Icons } from '../../icons/IconLibrary.jsx';
import { buildWhatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from '../../utils/whatsapp.js';

// Card azul con CTA de WhatsApp. Reutilizada en Home, About, Contact, Products.
// El ícono decorativo grande semitransparente queda anclado a la esquina inferior
// derecha. El contenido (título, bajada, botón) está en una capa superior con z-10.
//
// Props:
//   title    — string, título de la card
//   message  — string, mensaje predefinido (opcional, default = DEFAULT_WHATSAPP_MESSAGE)
//   children — contenido opcional debajo del título (ej: bajada descriptiva)
//
export default function WhatsappCta({ title, message = DEFAULT_WHATSAPP_MESSAGE, children }) {
    const href = buildWhatsappUrl(message);

    return (
        <section className="bg-primary text-white rounded-2xl shadow-sm mx-4 my-16 lg:my-20 p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decoración: ícono grande semitransparente de fondo */}
            <Icons.Whatsapp
                aria-hidden="true"
                className="absolute -right-6 -bottom-6 w-48 h-48 fill-white/10 pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
                    {title}
                </h2>
                {children && (
                    <p className="text-lg md:text-xl mb-8 text-white/90">
                        {children}
                    </p>
                )}
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center bg-white text-primary font-bold py-3 px-8 rounded-2xl hover:bg-white/90 transition-colors shadow text-lg"
                >
                    <Icons.Whatsapp className="w-5 h-5 mr-2 fill-primary group-hover:rotate-12 duration-300" />
                    Escribime
                </a>
            </div>
        </section>
    );
}
